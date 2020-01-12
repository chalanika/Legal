var express = require('express');
const { promisify } = require('util');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var multer = require('multer');
var fs = require('fs');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const async = require('async');
var sgTransport = require('nodemailer-sendgrid-transport');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
// var realUser = '02fe1b26861e4f';
// var realPassword = ''
// var upload = multer({dest: './uploads'});
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var storage = multer.diskStorage({
  destination:function(req,file,cb){
    var dir = `./public/images/${req.body.nic}/profile_photos`;
    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir , { recursive: true });
    }
      cb(null, dir);
  },
  filename:function(req,file,cb){
      cb(null,Date.now()+'.'+file.originalname); // `user-${req.user.nic}-${Date.now()}.${ext}`
  }
});

const fileFilter = (req , file , cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
  cb(null, true);
} else {
  cb(null , false);
}
}

var upload = multer({storage: storage , 
  limits: {
  fileSize: 1024 * 1024 * 5 
},
fileFilter: fileFilter 
});

// var upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
//   }
// });

router.post('/register', upload.single('image') , function (req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res) {
  var user = new User({
    type: req.body.type,
    username: req.body.username,
    nic: req.body.nic,
    email: req.body.email,
    detail: req.body.detail,
    area: req.body.area,
    address: req.body.address,
    number: req.body.number,
    password: User.hashPassword(req.body.password),
    image: req.file.path,
    creation_dt: Date.now()
  });

  try {
    doc = user.save().then(result => {
      console.log(result);
      res.status(201).json({
        message:"User registration successfully!",
        userCreated: {
          _id: result._id,
          image: result.image
        }
      })
    });
    // console.log(user);                                       // User details will display on console
    console.log('User registration successfull')             // To know user registration success or fail
    return res.status(201).json(doc);
  }
  catch (err) {
    console.log(err.message);
    if(err.message[61] == 'u'){
      console.log('*******ERROR : USERNAME Already taken*****')
      return res.status(501).json(1111);
    }
    if(err.message[61] == 'n' && err.message[62] == 'i' && err.message[63] == 'c'){
      console.log('*******ERROR : NIC Already taken*****')
      return res.status(501).json(1112);
    }
    if(err.message[61] == 'e'){
      console.log('*******ERROR : EMAIL Already taken*****')
      return res.status(501).json(1113);
    }
    // return res.status(501).json(err.code);
  }
}


router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) {console.log('1:',err); return res.status(501).json(err); }
    if (!user) { return res.status(501).json(2112); }
    req.logIn(user, function(err) {
      if (err) {console.log(err); return res.status(501).json(2113); }
      console.log('Login Success...');
      console.log(user);
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

router.get('/user',isValidUser,function(req,res,next){
  // console.log(req.user);
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  console.log("Logout Success");
  return res.status(200).json({message:'Logout Success'});
})

router.post('/forgotPassword', function(req, res, next) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          return req.status(404).json({message:'Not a user!'});
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpires = Date.now() + 10*60*1000;
        user.save(function (err) {
          if(err) {
              console.error('ERROR!');
          }
      });
        console.log(process.env.EMAIL_HOST,process.env.EMAIL_PORT,process.env.EMAIL_USERNAME,process.env.EMAIL_PASSWORD)
        const transporter = nodemailer.createTransport({
          // host: 'smtp.mailtrap.io',
          service: 'SendGrid',
          secure: false, // use SSL // this need to be removed
          // port: '587',
          auth: {
              user: 'apikey',
              pass: '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'
          },
          tls: {
            rejectUnauthorized: false // this need to be removed
        }
      });
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/users/resetPassword/${resetToken}`;
      console.log(resetURL);
      const message = `Forgot your password? Submit a PATCH request with your new password : ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
      var mailOptions = {
        from: 'Team Legal <legal@gmail.com>',
        to: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        text: message,
        html: `Forgot your password? Submit a PATCH request with your new password : <a href="${resetURL}">Reset Link</a>.\nIf you didn't forget your password, please ignore this email!`,
      };
      console.log('Sending Email!');
      let valid = true;
      transporter.sendMail(mailOptions, function(err,res){
        if(err){
          console.error('error:' , err);
          valid = false;
        }else{
          console.log('res:',res);
        }
      });
      if(valid){
        return res.status(200).send({
            message: "Success"
        });
    }else{
        return res.status(500).send({
            message: "Failed"
        });
    }
      });
});

router.get('/resetPassword/:token' ,async function(req,res,next){
  // 1) Get user based on the token
const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
// console.log(hashedToken);
const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()}});
  // 2)If token has not expired, and there is user, set the new password
if(!user){
  return res.status(400).json({message:'Token is invalid or expired.......'}); 
}
// console.log(user);
user.passwordResetToken = undefined;
user.passwordResetExpires = undefined;
user.save(function (err) {
  if(err) {
      console.error('ERROR!');
  }
});
// console.log(`${__dirname}`);
var path = `${__dirname}`;
path = path.replace(/\\/g, "/");
// console.log(path);
res.render('resetPassword', {email:user.email});
})

router.post('/updatePasswordViaEmail',urlencodedParser,function(req,res,next){
    // console.log(req.body.email);
    User.findOne({email: req.body.email} , function(err, user){
      if (!user) {
        return req.status(404).json({message:'Not a user!'});
      }
      if(req.body.password != req.body.confirmPassword){
        return req.status(501).json({message:'Password and request password does not match!'});
      }
      user.password = User.hashPassword(req.body.password); // Validations and Encryptions need to set
      user.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
    });
    });
    res.redirect('http://localhost:4200');
});

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}
/*update rate array*/
router.put('/:id/rates', async (req,res)=>{
  console.log(req.body);
  const rate = {
    rate:req.body.rate,
    feedback:req.body.feedback
  };
  try{
    const lawyer = await User.findById(req.params.id);
    lawyer.rates.push(rate);

    const saved = await lawyer.save();
    res.json(saved);
  }catch(error){
    res.json({message:error});
  }
});
//show rates on lawyers profile
router.get('/rate/:id', async (req,res)=>{
  try{
    const lawyer = await User.findById(req.params.id);
    console.log("rate");
    console.log(lawyer.rates);
    res.json(lawyer.rates);
  }catch{
    res.json({message:error});
  }
})
//find special lawyer
router.get('/lawyer/:id', async (req,res)=>{  
  try{
    const lawyer = await User.findById(req.params.id);
  res.json(lawyer);
  }catch{
    res.json({message:error});
  }
  
})
//find all lawyers from users
router.get('/lawyers',async (req,res)=>{ 
  try{
    const result = await User.find({type:"2"});
    res.json(result);
  }catch{
    res.json({message:error});
  }
})
//find lawyers by category
router.get('/lawyers/:category',async (req,res)=>{ 
  console.log(req.params.category);
  const type  = req.params.category;
  try{
    const result = await User.find({area:type});
    res.json(result);
  }catch{
    res.json({message:error});
  }
})


module.exports = router;

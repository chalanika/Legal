var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var multer = require('multer');
var fs = require('fs');
// var upload = multer({dest: './uploads'});
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var storage = multer.diskStorage({
  destination:function(req,file,cb){
    var dir = `./public/images/${req.body.nic}/profile_photos`;
    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir);
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
    console.log(user);                                       // User details will display on console
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
  console.log(req.user);
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  console.log("Logout Success");
  return res.status(200).json({message:'Logout Success'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}

module.exports = router;

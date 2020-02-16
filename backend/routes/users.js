var express = require('express');
const { promisify } = require('util');
var router = express.Router();
var User = require('../models/user');
var Case = require('../models/case');
var fileShare = require('../models/fileShareSchema');
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
var path = require('path');
var f_name;
// var realUser = '02fe1b26861e4f';
// var realPassword = ''
// var upload = multer({dest: './uploads'});
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.body.task == 'share')  // If the file is to share
      var dir = `./public/images/${req.body.nic}/sent_items`;
    else
      var dir = `./public/images/${req.body.nic}/profile_photos`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    f_name = Date.now() + '.' + file.originalname;
    cb(null, f_name); // `user-${req.user.nic}-${Date.now()}.${ext}`
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

var upload = multer({
  storage: storage,
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

router.post('/register', upload.single('image'), function (req, res, next) {
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
    doc = await user.save();
    return res.status(200).json({
      message: 'User Registration Successfull!',
      result: doc
    });
  }
  catch (err) {
    console.log(err.message);
    if (err.message[61] == 'u') {
      console.log('*******ERROR : USERNAME Already taken*****')
      return res.status(501).json(1111);
    }
    if (err.message[61] == 'n' && err.message[62] == 'i' && err.message[63] == 'c') {
      console.log('*******ERROR : NIC Already taken*****')
      return res.status(501).json(1112);
    }
    if (err.message[61] == 'e') {
      console.log('*******ERROR : EMAIL Already taken*****')
      return res.status(501).json(1113);
    }
  }
}

var copyFile = (file, dir2) => {
  var f = path.basename(file);
  var source = fs.createReadStream(file);
  var dest = fs.createWriteStream(path.resolve(dir2, f));

  source.pipe(dest);
  source.on('end', function () { console.log('Successfully copied'); });
  source.on('error', function (err) { console.log(err); })
};

router.post('/share', upload.single('image'), function (req, res, next) {
  console.log(req.body);
  var dir = `./public/images/${req.body.nic}/sent_items/${f_name}`;
  var des = `./public/images/${req.body.lawyer}/received_items`;
  if (!fs.existsSync(des)) {
    fs.mkdirSync(des, { recursive: true });
  }

  var fileshare = new fileShare({
    from: req.body.nic,
    fromName: req.body.fromName,
    to: req.body.lawyer,
    file: req.file.path,
    fileName: req.file.filename,
    upload_dt: Date.now()
  });

  fileshare.save(function (err) {
    if (err) {
      console.error('ERROR!');
    }
  });

  copyFile(dir, des + '/');
  return res.status(200).json({
    message: 'File Sent Successfull!'
  });
});

router.get('/files/:token', function (req, res, next) {
  fileShare.find({ to: req.params.token }, function (err, files) {
    var o = {}
    var key = 'Received Files';
    o[key] = [];
    files.forEach(ele => {
      var data = {
        name: ele.fileName,
        from: ele.fromName
      };
      o[key].push(data);
    });
    console.log(o);
    return res.status(200).json(o);
  });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { console.log('1:', err); return res.status(501).json(err); }
    if (!user) { return res.status(501).json(2112); }
    req.logIn(user, function (err) {
      if (err) { console.log(err); return res.status(501).json(2113); }
      console.log('Login Success...');
      console.log(user);
      return res.status(200).json({ message: 'Login Success' });
    });
  })(req, res, next);
});

router.get('/user', isValidUser, function (req, res, next) {
  console.log(req.user);
  return res.status(200).json(req.user);
});

router.get('/getLawyers', isValidUser, function (req, res, next) {
  User.find({ type: 'Lawyer' }, function (err, user) {

    // console.log(ele.nic);
    var o = {} // empty Object
    var key = 'All Lawyers';
    o[key] = []; // empty Array, which you can push() values into

    user.forEach(ele => {
      var data = {
        id: ele.nic,
        name: ele.username
      };
      o[key].push(data);
      // {'id': 'Admin', 'name':'Admin'}, {'id':'Lawyer', 'name': 'Lawyer'}, {'id':'Client', 'name': 'Client'}
    });

    console.log(o);
    return res.status(200).json(o);
  });
  // return res.status(200).json(req.user);
});

router.get('/getConnect/:token', isValidUser, function (req, res, next) {
  console.log()
  Case.find({ lawyer_id: req.params.token }, function (err, cases) {
    // console.log(ele.nic);
    var o = {} // empty Object
    var key = 'All Connect';
    o[key] = []; // empty Array, which you can push() values into

    cases.forEach(ele => {
      var data = {
        id: ele.client_id,
        name: ele.clientName
      };
      o[key].push(data);
      // {'id': 'Admin', 'name':'Admin'}, {'id':'Lawyer', 'name': 'Lawyer'}, {'id':'Client', 'name': 'Client'}
    });
    console.log(o);
    return res.status(200).json(o);
  });
  // return res.status(200).json(req.user);
});

router.get('/getConnect2/:token', isValidUser, function (req, res, next) {
  Case.find({client_id:req.params.token} , function(err , cases){
    var o = {}
    var key = 'All Connect';
    o[key] = [];
    cases.forEach(ele => {
      var data = {
          id: ele.lawyer_id,
          name: ele.lawyerName
      };
      o[key].push(data);
    });
    console.log(o);
    return res.status(200).json(o);
  });
});

router.get('/logout', isValidUser, function (req, res, next) {
  req.logout();
  console.log("Logout Success");
  return res.status(200).json({ message: 'Logout Success' });
})

router.post('/forgotPassword', function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      return res.status(404).json({ message: 'Not a user!' });
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    user.save(function (err) {
      if (err) {
        console.error('ERROR!');
      }
    });
    console.log(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD)
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
    transporter.sendMail(mailOptions, function (err, res) {
      if (err) {
        console.error('error:', err);
        valid = false;
      } else {
        console.log('res:', res);
      }
    });
    if (valid) {
      return res.status(200).send({
        message: "Success"
      });
    } else {
      return res.status(500).send({
        message: "Failed"
      });
    }
  });
});

router.get('/resetPassword/:token', async function (req, res, next) {
  // 1) Get user based on the token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  console.log(hashedToken);
  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
  // 2)If token has not expired, and there is user, set the new password
  if (!user) {
    return res.status(400).json({ message: 'Token is invalid or expired.......' });
  }
  console.log(user);                          // To verify the user by developers
  user.passwordResetToken = undefined;        // Erase the passwordResetToken Field
  user.passwordResetExpires = undefined;      // Erase the passwordResetExpires Field
  user.save(function (err) {
    if (err) {
      console.error('ERROR!');              // Make a send response
    }
  });
  console.log(`${__dirname}`);
  var path = `${__dirname}`;
  path = path.replace(/\\/g, "/");            // Replace backward slashes with forward slashes
  console.log(path);
  res.render('resetPassword', { email: user.email }); // Render html page to reset password
});

router.post('/updatePasswordViaEmail', urlencodedParser, function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      return res.status(404).json({ message: 'Not a user!' });
    }
    if (req.body.password != req.body.confirmPassword) {
      return res.status(501).json({ message: 'Password and request password does not match!' });
    }
    user.password = User.hashPassword(req.body.password); // Validations and Encryptions need to set
    user.save(function (err) {
      if (err) {
        console.error('ERROR!');
      }
    });
  });
  res.redirect('http://localhost:4200');
});

const filterobj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

router.patch('/updateMe', async function (req, res, next) {
  console.log(req.body);
  if (req.body.password) {
    return res.status(501).json({ message: 'This route is not for update password...!' });
  }
  User.findOne({ email: req.user.email }, function (err, user) {
    if (!user) {
      return res.status(404).json({ message: 'Not a user!' });
    }
    user.username = req.body.uname; // Validations and Encryptions need to set
    user.number = req.body.cnumber;
    user.address = req.body.caddress;
    user.area = req.body.updateArea;
    user.save(function (err) {
      if (err) {
        console.error('ERROR!');
      }
    });
    return res.status(200).json({ message: 'User Update Successfull!' });
  });
});

// updatePassword is not completed yet!
router.post('/updatePassword', function (req, res, next) {
  User.findById(req.user._id, function (err, user) {
    if (!user.isValid(req.body.password)) {
      console.log('Incorrect Password');
      return res.status(401).json({ message: 'Old password is incorrect!' });
    }
    user.password = User.hashPassword(req.body.newpassword); // Validations and Encryptions need to set
    user.save(function (err) {
      if (err) {
        console.error('ERROR!');
      }
    });
  });
  return res.status(200).json({ message: 'Update password is successfull' });
});

router.delete('/deleteMe', function (req, res, next) {
  User.findById(req.user._id, function (err, user) {
    user.active = false;
    user.save(function (err) {
      if (err) {
        console.error('ERROR!');
      }
    });
    res.status(204).json({
      status: 'User deletion successfull',
      data: null
    });
  });
});

router.delete('/deleteUser/:token' , function(req,res,next){
  User.findById(req.params.token , function(err , user){
    user.active = false;
    user.save(function (err) {
      if (err) {
        console.error('ERROR!');
      }
    });
    res.status(204).json({
      status:'User deletion successfull',
      data:null
    });
  });
});

function isValidUser(req, res, next) {
  if (req.isAuthenticated()) next();
  else return res.status(401).json({ message: 'Unauthorized Request' });
}
/*update rate array*/
router.put('/:id/rates', async (req, res) => {
  console.log(req.body);
  const rate = {
    rate: req.body.rate,
    feedback: req.body.feedback
  };
  try {
    const lawyer = await User.findById(req.params.id);
    lawyer.rates.push(rate);
    const saved = await lawyer.save();
    res.json(saved);
  } catch (error) {
    res.json({ message: error });
  }
});
//show rates on lawyers profile
router.get('/rate/:id', async (req, res) => {
  try {
    const lawyer = await User.findById(req.params.id);
    console.log("rate");
    console.log(lawyer.rates);
    res.json(lawyer.rates);
  } catch{
    res.json({ message: error });
  }
})
//find special lawyer
router.get('/lawyer/:id', async (req, res) => {
  try {
    const lawyer = await User.findById(req.params.id);
    res.json(lawyer);
  } catch{
    res.json({ message: error });
  }
})

//find specific client
router.get('/client/:id', async (req, res) => {
  try {
    const client = await User.findById(req.params.id);
    res.json(client);
  } catch{
    res.json({ message: error });
  }
})
//find all lawyers from users
router.get('/lawyers', async (req, res) => {
  try {
    const result = await User.find({ type: "Lawyer" });
    res.json(result);
  } catch{
    res.json({ message: error });
  }
})
//find lawyers by category
router.get('/lawyers/:category', async (req, res) => {
  console.log(req.params.category);
  const type = req.params.category;
  try {
    const result = await User.find({ area: type });
    res.json(result);
  } catch{
    res.json({ message: error });
  }
})

router.get('/client/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const client = await User.findById(req.params.id);
    res.json(client);
  } catch{
    res.json({ message: error });
  }
})

module.exports = router;

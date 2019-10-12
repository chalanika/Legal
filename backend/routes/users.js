var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res) {

  var user = new User({
    username: req.body.username,
    nic: req.body.nic,
    email: req.body.email,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();
    console.log(user);                                       // User details will display on console
    console.log('User registration successfull')             // To know user registration success or fail
    return res.status(201).json(doc);
  }
  catch (err) {
    console.log(err);
    if(err.message[61] == 'u'){
      console.log('*******ERROR : USERNAME Already taken*****')
      return res.status(501).json(1111);
    }
    if(err.message[61] == 'n'){
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

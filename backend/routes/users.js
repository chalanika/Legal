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
    console.log(doc);
    return res.status(201).json(doc);
  }
  catch (err) {
    console.log(err);
    return res.status(501).json(err);
    
  }
}


router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

router.get('/user',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

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
router.get('/:id', async (req,res)=>{
  try{
    const lawyer = await User.findById(req.params.id);
    console.log(lawyer.rates);
    res.json(lawyer.rates);
  }catch{
    res.json({message:error});
  }
})

module.exports = router;

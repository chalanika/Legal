var express = require('express');
var router = express.Router();
var Post = require('../models/post');

router.post('/postcreation',async function(req,res,next){
    console.log(req.body);
    const postnew = new Post({
      name :req.body.name,
      email:req.body.email,
      description:req.body.description
    });
    try {
      const saved = await postnew.save();
      res.json(saved);
    } catch (error) {
      res.json({ message: error });
    }
  });

  module.exports = router;
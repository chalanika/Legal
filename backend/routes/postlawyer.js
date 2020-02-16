var express = require('express');
var router = express.Router();
var Post = require('../models/post');


//saving a created post
router.post('/postcreation',async function(req,res,next){
    const postnew = new Post({
      name :req.body.details.name,
      email:req.body.details.email,
      title:req.body.details.title,
      description:req.body.details.description,
      id:req.body.lawid
    });
    // console.log("postnew"+postnew);
    try {
      const saved = await postnew.save();
      res.json(saved);
    } catch (error) {
      res.json({ message: error });
    }
  });

  //view of posts created by a particular lawyer
  router.get('/postview/:lawyerId',async (req,res)=>{
    try {
        const post = await Post.find({ id: req.params.lawyerId });
        console.log(post);
        console.log('success');
        res.json(post);
      } catch (error) {
          console.log('error')
        res.json({ message: error });
      }
  });

  //delete a post
  router.delete('/postdelete/:pid',async (req,res) =>{
    console.log("going to delte the post");
    try{
      console.log("atule inne");
        const del = await Post.remove({ _id: req.params.pid });
        console.log(del);
        console.log('delete success');
        res.json(del);
    }
    catch (error) {
      console.log('error')
    res.json({ message: error });
    }
  });

  //update post details
  router.get('/postupdate/:pid',async (req,res) =>{
    console.log("going to edit the post");
    console.log(req);
    try{
      console.log("edit eka athule inne");
      const edit = await Post.find({_id: req.params.pid });
      console.log(edit);
      console.log('update success');
      res.json(edit);
    }
    catch (error) {
      console.log('error')
    res.json({ message: error });
  }
});


  module.exports = router;
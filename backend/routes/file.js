var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');       
var encryptor = require('file-encryptor');
var key = 'My Super Secret Key';
var File = require('../models/user'); //To save the file to database

var store = multer.diskStorage({
    destination:function(req,file,cb){
        // console.log(req);
        cb(null, './uploads/images');
    },
    filename:function(req,file,cb){
        const ext = file.mimetype.split('/')[1]; // extracting the extention
        console.log(ext);
        cb(null, Date.now()+'.'+file.originalname); // `user-${req.user.nic}-${Date.now()}.${ext}`
    }
});


var upload = multer({storage:store}).single('file');

_router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        } 
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});


_router.post('/download', function(req,res,next){
    filepath = path.join(__dirname,'../uploads/images') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

module.exports = _router;
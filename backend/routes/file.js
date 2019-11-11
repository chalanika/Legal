var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var key = 'My Super Secret Key';
var File = require('../models/fileSchema');                                                     //To save the file to database

var store = multer.diskStorage({
    destination:function(req,file,cb){
        var dir = `./uploads/files/${req.body.nic}/myFiles`;
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir , { recursive: true });
          }
        cb(null, dir);
    },
    filename:function(req,file,cb){
        const ext = file.mimetype.split('/')[1];                                                   // extracting the extention
        console.log(ext);
        cb(null, Date.now()+'.'+file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

_router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        addFileToDb(req,res);
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});

function addFileToDb(req,res){
    var theFile = new File({
        file: req.file.path,
        creation_dt: Date.now()
      });
      theFile.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
    });
}

_router.post('/download', function(req,res,next){
    filepath = path.join(__dirname,`../uploads/files/${req.body.nic}/myFiles`) +'/'+ req.body.filename;
    res.sendFile(filepath);
});

module.exports = _router;

// See all Files
// fs.readdir('./uploads/files/962992978V/myFiles', (err, files) => {
//     files.forEach(file => {
//       console.log(file);
//     });
//   });
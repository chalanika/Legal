var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
// const algorithm = 'aes-256-ctr';
let key = 'MySuperSecretKey';
key = crypto.createHash('sha256').update(key).digest('base64').substr(0, 32);
var File = require('../models/fileSchema');                                                     //To save the file to database
var encryptor = require('file-encryptor');
var options = { algorithm: 'aes256' };

const nodecipher = require('node-cipher');

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
        originalname = req.file.originalname;
        uploadname = req.file.filename
        var input = req.file.path;
        input = path.resolve(input);
        console.log('Input',input);
        nodecipher.encrypt({
            input: input,
            output: input+'.dat',
            password: key
        }, function (err, opts) {
            if (err) throw err;
            console.log('Image successfully encrypted!');
            fs.unlink(input,function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
           });
        });
        console.log(input);
        return res.json({originalname:originalname, uploadname:uploadname});
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
input = path.resolve(filepath);
nodecipher.decrypt({
    input: input+'.dat',
    output: filepath,
    password: key
    
  }, function (err, opts) {
    if (err) throw err;
    console.log('Image successfully decrypted!');
    input = input+'.dat';
    fs.unlink(input,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
   });
    res.sendFile(filepath);
  });
});

module.exports = _router;

// See all Files
// fs.readdir('./uploads/files/962992978V/myFiles', (err, files) => {
//     files.forEach(file => {
//       console.log(file);
//     });
//   });
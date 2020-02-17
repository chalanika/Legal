var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var crypto = require('crypto');
var fileShare = require('../models/fileShareSchema');
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
        addFileToDb(req,res,req.body.nic);
        originalname = req.file.originalname;
        uploadname = req.file.filename
        var input = req.file.path;
        input = path.resolve(input);
        nodecipher.encrypt({
            input: input,
            output: input+'.enc',
            password: key
        }, function (err, opts) {
            if (err) throw err;
            console.log('Image successfully encrypted!');
            fs.unlink(input,function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
           });
        });
        return res.json({originalname:originalname, uploadname:uploadname});
    });
});

function addFileToDb(req,res,nic){
    var theFile = new File({
        uploadedBy: nic,
        file: req.file.path,
        upload_dt: Date.now()
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
    input: input+'.enc',
    output: filepath,
    password: key
    
  }, function (err, opts) {
    if (err) throw err;
    console.log('Image successfully decrypted!');
    res.sendFile(filepath , function(err){
        if(err) console.log(err);
        else {
            fs.unlink(filepath,function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
           });
        }
    });
  });
});

_router.post('/downloadSh',function(req,res,next){
    console.log(req.body);
    filepath = path.join(__dirname,`../public/images/${req.body.nic}/received_items`) +'/'+ req.body.filename;
    filepath = filepath.replace(/\\/g, "/");
    console.log(filepath);
    // filepath = path.join(__dirname,`../uploads/files/${req.body.nic}/myFiles`) +'/'+ req.body.filename;
    input = path.resolve(filepath);
    nodecipher.decrypt({
        input: input+'.enc',
        output: filepath,
        password: key
        
    }, function (err, opts) {
        if (err) throw err;
        console.log('Image successfully decrypted!');
        res.sendFile(filepath , function(err){
            if(err) console.log(err);
            else {
                fs.unlink(filepath,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
            });
            }
        });
    });
    res.sendFile(filepath , function(err){
        if(err) console.log(err);
    });
});

_router.delete('/deleteSh/:token1/:token2',function(req,res,next){
    
            fileShare.findOneAndRemove({to:req.params.token1,fileName:req.params.token2}, function(err){
                if(err) console.log(err);
                else console.log("Document Deleted");
            });
            fs.unlink(filepath,function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
           });
           return;
});

_router.post('/share',function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        //addFileToDb(req,res,req.body.nic);
        originalname = req.file.originalname;
        uploadname = req.file.filename
        var input = req.file.path;
        input = path.resolve(input);
        return res.json({originalname:originalname, uploadname:uploadname});
    });
    return 0;
});

module.exports = _router;

// See all Files
// fs.readdir('./uploads/files/962992978V/myFiles', (err, files) => {
//     files.forEach(file => {
//       console.log(file);
//     });
//   });
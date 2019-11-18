var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var validator = require('validator');
var crypto = require('crypto');

var schema = new Schema({
    type : {
        type:String,
        required:[true,'User type cannot be empty'],
    },
    username: {
        type:String,
        required:[true,'USER_NAME cannot be empty'],
        unique:[true,'This USER_NAME has already been taken']
    },
    nic : {
        type:String,
        required:[true,'NIC cannot be empty'],
        unique:[true,'This NIC has already been taken']
    },
    email : {
        type:String,
        required:[true,'EMAIL cannot be empty'],
        unique:[true,'This EMAIL has already taken'],
        validate:[validator.isEmail,'Please provide a valid email']
    },
    area : {
        type:String,
        // required:[true,'Area cannot be empty'],
    },
    address : {
        type:String,
        // required:[true,'Address cannot be empty'],
        // unique:[true,'This Address has already taken'],
    },
    number : {
        type:String,
        // required:[true,'Number cannot be empty'],
        // unique:[true,'This Number has already taken'],
    },
    detail : {
        type:String,
        // required:[true,'Details cannot be empty'],
    },
    image: String,
    password: {
        type:String,
        required:[true,'Please provide a password'],
        minlength:8
    },
    creation_dt:{
        type:Date,
        required:true
    },
    passwordResetToken: String,
    passwordResetExpires: Date
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword,this.password);
}

// schema.methods.createPasswordResetToken = function(){
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//     console.log({resetToken} , this.passwordResetToken);
//     // this.passwordResetExpires = Date.now() + 10*60*1000;
//     return resetToken;
// }

module.exports = mongoose.model('User',schema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var validator = require('validator');

var schema = new Schema({
    username: {
        type:String,
        require:true,
        unique:[true,'This USER_NAME has already been taken']
    },
    nic : {
        type:String,
        require:true,
        unique:[true,'This NIC has already been taken']
    },
    email : {
        type:String,
        require:true,
        unique:[true,'This EMAIL has already taken'],
        validate:[validator.isEmail,'Please provide a valid email']
    },
    photo: String,
    password: {
        type:String,
        require:[true,'Please provide a password'],
        minlength:8
    },
    creation_dt:{
        type:Date,
        require:true
    }
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword,this.password);
}

module.exports = mongoose.model('User',schema);
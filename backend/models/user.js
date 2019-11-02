var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const Rate = new Schema({
    rate : {type:Number},
    feedback:{type:String}
});

var schema = new Schema({
    username: {type:String,require:true},
    nic : {type:String,require:true},
    rates:{type:[Rate]},
    email : {type:String,require:true},
    password: {type:String,require:true},
    creation_dt:{type:Date,require:true}
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword,this.password);
}

module.exports = mongoose.model('User',schema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');
var validator = require('validator');

var schema = new Schema({
    file: String,
});


module.exports = mongoose.model('File',schema);
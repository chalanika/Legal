var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    file: String,
    creation_dt:Date
});


module.exports = mongoose.model('File',schema);
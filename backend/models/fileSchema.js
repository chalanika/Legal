var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    uploadedBy: String,
    file: [String],
    upload_dt:Date
});

module.exports = mongoose.model('File',schema);
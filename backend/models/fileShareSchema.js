var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    from: String,
    to: String,
    file: String,
    fileName: String,
    upload_dt:Date
});

module.exports = mongoose.model('FileShare',schema);
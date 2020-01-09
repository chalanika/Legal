const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
    lawyer_id:{
        type:String,
        required:true
    },
    client_id:{
        type:String,
        required:true
    },
    is_closed:{
        type:Boolean,
        required:true
    },
    is_rated:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('Case', CaseSchema);
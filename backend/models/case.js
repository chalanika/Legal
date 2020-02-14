const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
    caseName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    lawyer_id:{
        type:String,
        required:true
    },
    lawyerName:{
        type:String,
        required:true
    },
    client_id:{
        type:String,
        required:true
    },
    clientName:{
        type:String,
        required:true
    },
    lawType:{
        type:String,
        required:true
    },
    openedDate:{
        type:Date,
        required:true
    },
    closedDate:{
        type:Date
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
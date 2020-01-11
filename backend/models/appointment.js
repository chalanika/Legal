const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    lawyerId:{
        type:String,
        required:true
    },
    lawyerName:{
        type:String,
        required:true
    },
    clientId:{
        type:String,
        required:true
    },
    clientName:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    startDateTime:{
        type:Date,
        required:true
    },
    finishDateTime:{
        type:Date,
        required:true
    },
    isAccepted:{
        type:Boolean,
        required:true
    },
    isRejected:{
        type:Boolean,
        required:true
    },
    isAlert:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
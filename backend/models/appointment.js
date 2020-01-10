const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    lawyerId:{
        type:String,
        required:true
    },
    clientId:{
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
    isSeen:{
        type:Boolean
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
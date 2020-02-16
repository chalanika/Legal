const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostData = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    id:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('post', PostData);
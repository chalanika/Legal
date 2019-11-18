const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    lawyerCount: {
        type: Number,
    }
});

module.exports = mongoose.model('Category', CategorySchema);

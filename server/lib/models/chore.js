const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    target: Number,
    description: String
});

module.exports = mongoose.model('Chore', schema);
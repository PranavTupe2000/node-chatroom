const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    admin:{
        type: Object,
        required
    },
    members:{
        type:Array,
        default:[]
    }
})
const Room = mongoose.model('room', roomSchema);
module.exports = Room;
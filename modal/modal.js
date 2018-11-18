const mongoose = require("mongoose");
const NoteSchema = mongoose.Schema({
    userName : {type: String, require: true},
    content : {type: String, require: true},
    delete : {type: Boolean, default: false},
    date :{type: Date, default: Date.now()}
},
{
    timestamps: true
});
module.exports = mongoose.model('note', NoteSchema);
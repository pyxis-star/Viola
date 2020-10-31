const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    playerID: String,
    playerName: String,
    blacklist: Boolean
});

module.exports = mongoose.model('User', user)

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var guild = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
	prefix: String
});

module.exports = mongoose.model('Guild', guild)

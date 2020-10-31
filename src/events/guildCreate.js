const chalk = require("chalk");
const mongoose = require('mongoose');
const config = require('../../config.json');
const Guild = require('../models/guild');

module.exports = (client, guild) => {
    guild = new Guild({
      _id: mongoose.Types.ObjectId(),
      guildID: guild.id,
      guildName: guild.name
   });
    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));
    console.log(`[ ${chalk.green('GUILD CREATE')} ] - New server!\nGuild: ${guild.name} (${guild.id})`);
};

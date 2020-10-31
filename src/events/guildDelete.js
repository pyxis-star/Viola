const chalk = require("chalk");
const Guild = require("../models/guild");

module.exports = (client, guild) => {
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err) => {
        if (err) console.log(err)
    console.log(`[ ${chalk.red('GUILD DELETE')} ] - Guild deleted!`);
    });
};

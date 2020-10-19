const chalk = require("chalk");

module.exports = (client, guild) => {
    console.log(`[ ${chalk.green('GUILD CREATE')} ] - New server!\nOwner: ${guild.owner.user.tag} - Guild: ${guild.name} (${guild.id})`);
};
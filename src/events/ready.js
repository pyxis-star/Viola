const chalk = require("chalk");
const config = require("../../config.json");
const Constants = require('../../node_modules/discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`

module.exports = async (client) => {
    client.user.setActivity(`${config.prefix}help`, { type: 3, browser: "DISCORD IOS"  });
    console.log(`[ ${chalk.magenta("STATUS")} ] - Online!`)
};
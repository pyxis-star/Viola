const moment = require("moment");
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
      name: 'ontime',
      aliases: ['up', 'uptime'],
      cooldown: 10,
      usage: 'ontime',
      description: 'See my ontime!',
      userPerms: [],
      clientPerms: []
    },
    run: async (client, message, args) => {
        await message.channel.send(`***~ I'm online for ` + moment.duration(client.uptime)._data.days + ` d ` + moment.duration(client.uptime)._data.hours + ` h ` + moment.duration(client.uptime)._data.minutes + ` m ` + moment.duration(client.uptime)._data.seconds + ` s ` + `***`)
    },
}
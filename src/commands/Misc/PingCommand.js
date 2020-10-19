const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'ping',
        aliases: ['pong', 'latency'],
        cooldown: 10,
        usage: 'ping',
        category: 'Misc',
        description: 'Response!',
        userPerms: [],
        clientPerms: []
    },
    run: async (client, message, args) => {
        const m = await message.channel.send("Pong!");

        m.edit(`🏓 **|** Pong\n🌙 **|** Client: ${client.ws.ping}ms\n📡 **|** Server: ${m.createdTimestamp - message.createdTimestamp}ms`);
    },
};
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const neko = new nekos();

module.exports = {
    config: {
        name: 'cat',
        category: 'Fun',
        aliases: ['cats'],
        cooldown: 5,
        usage: 'cat',
        description: 'Random cat',
        userPerms: [],
        clientPerms: ['EMBED_LINKS'],
    },
    run: async (client, message, args) => {
        await neko.sfw.meow().then(cat => {
            message.channel.send(new MessageEmbed().setColor(config.color).setImage(cat.url).setTimestamp())
        }).catch(err => {
            console.log(err)
        })
    },
};

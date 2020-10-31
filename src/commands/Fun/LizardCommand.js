const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const neko = new nekos();

module.exports = {
    config: {
        name: 'lizard',
        aliases: ['lizards'],
        cooldown: 5,
        category: 'Fun',
        usage: 'lizard',
        description: 'Random lizard',
        userPerms: [],
        clientPerms: ['EMBED_LINKS'],
    },
    run: async (client, message, args) => {
        await neko.sfw.lizard().then(lizard => {
            message.channel.send(new MessageEmbed().setColor(config.color).setImage(lizard.url).setTimestamp())
        }).catch(err => {
            console.log(err)
        })
    },
};

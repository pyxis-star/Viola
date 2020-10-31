const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const neko = new nekos();

module.exports = {
    config: {
        name: 'goose',
        aliases: ['gooses'],
        cooldown: 5,
        category: 'Fun',
        usage: 'goose',
        description: 'Random goose',
        userPerms: [],
        clientPerms: ['EMBED_LINKS'],
    },
    run: async (client, message, args) => {
        await neko.sfw.goose().then(goose => {
            message.channel.send(new MessageEmbed().setColor(config.color).setImage(goose.url).setTimestamp())
        }).catch(err => {
            console.log(err)
        })
    },
};

const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const neko = new nekos();

module.exports = {
    config: {
        name: 'kiss',
        aliases: ['kissu'],
        cooldown: 5,
        usage: 'kiss @user',
        category: 'Fun',
        description: 'Kisssssss!',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        let user = message.mentions.users.first();

        await neko.sfw.kiss().then(kiss => {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setImage(kiss.url)
                .setColor(config.color)
                .setDescription(`**${message.author.username} kissed ${user.username}**`)
            message.channel.send(embed)
        });
    },
};
const config = require("../../../config.json");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const neko = new nekos();
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'pat',
        aliases: ['patpat'],
        cooldown: 5,
        usage: 'pat @user',
        category: 'Fun',
        description: 'PATPAT!',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        let user = message.mentions.users.first();

        await neko.sfw.pat().then(pat => {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setImage(pat.url)
                .setColor(config.color)
                .setDescription(`**${message.author.username} patpat ${user.username}**`)
            message.channel.send(embed)
        });
    },
};
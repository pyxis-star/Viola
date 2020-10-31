const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const neko = new nekos();

module.exports = {
    config: {
        name: 'poke',
        aliases: ['pokee'],
        cooldown: 5,
        usage: 'poke @user',
        category: 'Fun',
        description: 'POKE!',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        let user = message.mentions.users.first();
        if (!user) return

        await neko.sfw.poke().then(poke => {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setImage(poke.url)
                .setColor(config.color)
                .setDescription(`**${message.author.username} poke ${user.username}**`)
            message.channel.send(embed)
        });
    },
};

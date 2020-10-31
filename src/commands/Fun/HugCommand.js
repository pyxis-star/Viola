const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const neko = new nekos();

module.exports = {
    config: {
        name: 'hug',
        aliases: ['hugg'],
        cooldown: 5,
        usage: 'hug @user',
        category: 'Fun',
        description: 'HUG!',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        let user = message.mentions.users.first();
        if (!user) return

        await neko.sfw.hug().then(hug => {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setImage(hug.url)
                .setColor(config.color)
                .setDescription(`**${message.author.username} hugged ${user.username}**`)
            message.channel.send(embed)
        });
    },
};

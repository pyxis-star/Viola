const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'ship',
        aliases: [],
        cooldown: 10,
        category: 'Fun', 
        usage: 'ship @user1 @user2',
        description: 'Ship someone',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        let msg = '';
        let image = '';
        let avatar = message.author.displayAvatarURL({ dynamic: true });
        const user1 = message.mentions.users.first();
        const user2 = message.mentions.users.last();
        var rand = Math.floor(Math.random() * 100);

        if (!user1) return message.reply('**~ Mention someone**');
        if (!user2) return message.reply('**~ Mention someone**');

        const embed = new MessageEmbed()
            .setColor(config.color)
            .setTimestamp()

        if (rand <= 45) {
            msg = 'Just friends';
            image = 'https://31.media.tumblr.com/acb2b904c219dafceff8e660f4207317/tumblr_my8poiw5ak1qztgoio1_500.gif';
            embed.setAuthor(msg, avatar).setDescription(`The chances of **${user1.username}** and **${user2.username}** are **${rand}%**`);
            embed.setImage(image);
            return message.channel.send(embed)
        } else if (rand >= 46 <= 70) {
            msg = 'Maybe';
            image = 'https://media1.tenor.com/images/f8ae16abc73704a2b27344a681c6c850/tenor.gif';
            embed.setAuthor(msg, avatar).setDescription(`The chances of **${user1.username}** and **${user2.username}** are **${rand}%**`);
            embed.setImage(image);
            return message.channel.send(embed);
        } else {
            msg = 'YES YES';
            image = 'https://media1.tenor.com/images/110dbddfd3d662479c214cacb754995d/tenor.gif';
            embed.setAuthor(msg, avatar).setDescription(`The chances of **${user1.username}** and **${user2.username}** are **${rand}%**`);
            embed.setImage(image);
            return message.channel.send(embed);
        }
    },
}
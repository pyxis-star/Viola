const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'avatar',
        aliases: ['av'],
        cooldown: 5,
        usage: 'avatar @user',
        category: 'Info', 
        description: 'Display avatar user',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        
        message.reply(new MessageEmbed().setColor(config.color).setTimestamp().setImage(user.displayAvatarURL({ dynamic: true, size: 2048 })));
    },
};
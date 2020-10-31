const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'b&w',
        aliases: ['bew'],
        cooldown: 10,
        usage: 'b&w @user',
        category: 'ImageManipulation',
        description: 'Black and White!',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        const user = message.author || message.mentions.users.first();
		const embed = new MessageEmbed()
        	.setColor(config.color)
        	.setTimestamp()
        	.setImage(`https://api.alexflipnote.dev/filter/b&w?image=${user.displayAvatarURL()}?size=2048`)
        message.reply(embed)
    },
};

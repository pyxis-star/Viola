const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'communism',
        aliases: ['urss', 'communist'],
        cooldown: 10,
        usage: 'urss @user',
        category: 'ImageManipulation',
        description: 'URSS edit',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        const user = message.author || message.mentions.users.first();
		const embed = new MessageEmbed()
        	.setColor(config.color)
        	.setTimestamp()
        	.setImage(`https://api.alexflipnote.dev/filter/communist?image=${user.displayAvatarURL()}?size=2048`)
        message.reply(embed)
    },
};

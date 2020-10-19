const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'serverinfo',
        aliases: ['server'],
        cooldown: 10,
        usage: 'serverinfo',
        description: 'Server infos',
        category: 'Info',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        const guild = client.guilds.cache.get(args[0]) || message.guild

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter(guild.id)
        	.setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor(config.color)
            .addField("Main", `> **Guild name: ${guild.name} (${guild.nameAcronym})\n> Owner: ${guild.owner}\n> Bots: \`${guild.members.cache.filter(m => m.user.bot).size}\`\n> Users: \`${guild.memberCount - guild.members.cache.filter(a => a.user.bot).size}\`**`, false)
            .addField("Date", `> **Create: \`${Viola.time('MM-DD-YYYY,` `HH:mm:ss', guild.createdTimestamp)}\`**`, false);
        
        message.reply(embed)
    },
};
const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'help',
        aliases: ['commands', 'h'],
        cooldown: 10,
        usage: 'help',
        category: 'Info',
        description: 'Display commands!',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        if (args[0]) {
           return getCommand(client, message, args[0])
        } else {
            return helpMessage(client, message)
        }
        
        async function helpMessage(client, message) {
            const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setColor(config.color)
            .setFooter(`Shard: ${message.guild.shardID}`)
            .setDescription(`**Default prefix is '\`${config.prefix}\`'!\nDoubt in any command? Use \`${config.prefix}help\` \`command name\`**`)
            .addField('Misc commands', `\`${client.commands.filter(u => u.config.category === 'Misc').map(o => o.config.name).join('`, `')}\``, false)
            .addField('Info commands', `\`${client.commands.filter(u => u.config.category === 'Info').map(o => o.config.name).join('`, `')}\``, false)
            .addField('Fun commands', `\`${client.commands.filter(u => u.config.category === 'Fun').map(o => o.config.name).join('`, `')}\``, false)
            .addField('Util commands', `\`${client.commands.filter(u => u.config.category === 'Util').map(o => o.config.name).join('`, `')}\``, false)
            .addField('Image Manipulation commands', `\`${client.commands.filter(u => u.config.category === 'ImageManipulation').map(o => o.config.name).join('`, `')}\``);

            message.channel.send(embed)
        }
        
        async function getCommand(client, message, input) {
            	const cmd = client.commands.get(input) || client.commands.get(client.aliases.get(input.toLowerCase()));;
            	let info = `No information found for command **${input}**`;
            
            	if (!cmd) {
            	return message.channel.send(new MessageEmbed().setColor(config.color).setTimestamp().setDescription(info));    
		} else {
                if (cmd.config.name) info = `**Command Name**: \`${cmd.config.name}\``;
        	if (cmd.config.aliases) info += `\n**Aliases**: ${cmd.config.aliases.map(a => `\`${a}\``).join(', ')}`;
                if (cmd.config.cooldown) info += `\n**Cooldown**: \`${cmd.config.cooldown}\``;
       		if (cmd.config.description) info += `\n**Description**: \`${cmd.config.description}\``;
                if (cmd.config.usage) info += `\n**Usage**: \`${cmd.config.usage}\``;
                if (cmd.config.userPerms) info += `\n**User perms**: ${cmd.config.userPerms}`;
                if (cmd.config.clientPerms) info += `\n**Bot perms**: ${cmd.config.clientPerms}`;
                
                return message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true})).setColor(config.color).setDescription(info).setTimestamp());
            }
        }
    },
};

const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'userinfo',
        aliases: ['user', 'whois'],
        cooldown: 10,
        category: 'Info',
        usage: 'userinfo @user',
        description: 'User informations',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        const avatar = user.displayAvatarURL({ dynamic: true });
        const create = user.createdAt;
        const times = user.createdTimestamp;
        const flags = {
  			DISCORD_EMPLOYEE: 'Discord Employee',
  			DISCORD_PARTNER: 'Discord Partner',
 			HYPESQUAD_EVENTS: 'Hypesquase Events',
  			BUGHUNTER_LEVEL_1: 'Bughunter Level 1',
  			HOUSE_BRAVERY: 'House Bravery',
  			HOUSE_BRILLIANCE: 'House Brilliance',
  			HOUSE_BALANCE: 'House Balance',
  			EARLY_SUPPORTER: 'Early Supporter',
  			TEAM_USER: 'Team User',
  			SYSTEM: 'System',
  			BUGHUNTER_LEVEL_2: 'Bughunter Level 2',
  			VERIFIED_BOT: 'Verified Bot',
  			VERIFIED_DEVELOPER: 'Verified Developer',
            undefined: 'None'
  		};
        const status = {
    		online: 'Online',
    		idle: 'Idle',
    		offline: 'Offline',
    		dnd: 'DnD'
  		};
        
        const embed = new MessageEmbed()
        	.setAuthor(user.tag, avatar)
        	.setTimestamp()
         	.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 2048 }))
        	.setColor(config.color)
        	.addField('Main', `> **User ID: \`${user.id}\`\n> Avatar link: [\`Link\`](${user.displayAvatarURL({ dynamic: true, size: 2048 })})\n> Create accont: \`${Viola.time('MM-DD-YYYY,` `HH:mm:ss', create)}\`\n> Flags: \`${flags[user.flags.toArray()]}\`\n> Status: \`${status[user.presence.status]}\`**`, false);
        
        message.channel.send(embed);
    },
};
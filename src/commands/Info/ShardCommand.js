const { MessageEmbed } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
    	name: 'shard',
    	aliases: ['shards'],
    	cooldown: 10,
    	usage: 'shard',
    	category: 'Info',
    	description: 'Shards info',
    	userPerms: [],
    	clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
            const guilds = await client.shard.fetchClientValues('guilds.cache.size');
        	const users = await client.shard.fetchClientValues('users.cache.size');
            const memory = await client.shard.broadcastEval(`process.memoryUsage().rss / 1024 / 1024`);
            const uptime = await client.shard.fetchClientValues('uptime');
            const ws = await client.shard.fetchClientValues('ws.ping');
        	const embed = new MessageEmbed().setColor(config.color).setTimestamp()
			
        	for (let i = 0; i < client.options.shardCount; i++) {
                embed.addField(i === message.guild.shard.id ? i : i, `> **Uptime: \`${Viola.timeFormat(uptime[i])}\`**\n> **Ping: \`${ws[i]}\`ms**\n> **Memory: \`${(memory[i]).toFixed(2)}\`MB**\n> **Guilds: \`${guilds[i]}\`**\n> **Users: \`${users[i]}\`**`)
            }
        
        	message.reply(embed)
    },
};

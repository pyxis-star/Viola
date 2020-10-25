const { MessageEmbed } = require("discord.js");
const discord = require("discord.js");
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'botinfo',
        aliases: ['bt', 'bi', 'bot'],
        cooldown: 10,
        usage: 'botinfo',
        category: 'Info',
        description: 'My informations',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        let bot = client.user.createdAt;
        const promises = [
            client.shard.fetchClientValues('guilds.cache.size'),
            client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
            client.shard.broadcastEval(`process.memoryUsage().rss / 1024 / 1024`)
        ];

        return Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                const memory = results[2].reduce((acc, memoryusage) => acc + memoryusage, 0);
                const embed = new MessageEmbed()
                    .setAuthor(client.user.tag, client.user.avatarURL())
                    .setThumbnail(client.user.avatarURL())
                    .addField('Main', `> **ID: \`${client.user.id}\`\n> My creation date is \`${Viola.time('MM-DD-YYYY`, `HH:mm:ss', bot)}\`\n> Servers: \`${totalGuilds}\`\n> Users: \`${totalMembers}\`\n> Avatar source: ${Viola.arts}\n> GitHub: [\`pixis-star/Viola\`](${Viola.github})\n> Developer: \`${client.users.cache.get('410385863030341653').tag}\`**`, false)
                    .addField('System', `> **Language: [\`JavaScript\`](https://www.javascript.com/)\n> Node version: \`${process.env.NODE_VERSION}\`\n> Discord.js version: \`${discord.version}\`\n> CPU: \`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\`\n> RAM: \`${(memory).toFixed(2)}MB / Unlimited\`\n> Prefix: \`${config.prefix}\`**`, false)
                    .setTimestamp()
                    .setColor(config.color)
            		
                message.channel.send(embed)
            })
            .catch(console.error);
    },
};

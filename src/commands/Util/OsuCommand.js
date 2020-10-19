const osu = require("node-osu");
const osuApi = new osu.Api(process.env.OSU, {
    notFoundAsError: true,
    completeScores: false,
    parseNumeric: false
});
const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'osu',
        aliases: [],
        cooldown: 10,
        category: 'Util',
        usage: 'osu [beatmap/profile]',
        description: 'Osu informations',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        switch (args[0]) {
            case "profile":
                osuApi.getUser({ u: args[1] }).then(user => {
                    let pp = user.pp
                    let joined = user.joinDate
                    let level = user.level
                    let country = user.country
                    let plays = user.counts.plays
                    let s = user.counts.S
                    let ss = user.counts.SS
                    let sh = user.counts.SH
                    let ssh = user.counts.SSH

                    const embed1 = new MessageEmbed()
                        .setColor(config.color)
                        .setAuthor(user.name)
                    	.setThumbnail(`http://s.ppy.sh/a/${user.id}`)
                        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()
                        .addField('Main', `> **Level: \`${Math.round(level)}\`\n> Acc: \`${Math.round(user.accuracy).toFixed(2)}%\`\n> PP: \`${Math.round(pp.raw)}\`pp\n> PP rank: \`#${pp.rank}\`\n> Country pp rank: \`#${pp.countryRank}\`\n> Score ranked: \`${user.scores.ranked}\`\n> Score total: \`${user.scores.total}\`\n> Country: \`${country}\`\n> Join date: \`${Viola.time('MM-DD-YYYY,` `HH:mm:ss', joined)}\`\n> Count plays: \`${plays}\` [ SS: \`${ss}\`, SSH: \`${ssh}\`, SH: \`${sh}\`, S: \`${s}\` ]**`, false);

                    message.reply(embed1);
                }).catch(err => {
                    console.log(Viola.clean(err));
                    message.channel.send(`**~ An error happened... Sorry**`)
                });
                break;
            case "beatmap":
                if (isNaN(args[1])) return message.reply(`**~ Just use the map id!**`);
                osuApi.getBeatmaps({ b: args[1] }).then(map => {
                    const embed2 = new MessageEmbed()
                        .setAuthor(map[0].title)
                        .setTimestamp()
                    	.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
                        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        .setColor(config.color)
                        .addField('Main', `> **Creator: \`${map[0].creator}\`\n> Combo max: \`${map[0].maxCombo}\`\n> Version: \`${map[0].version}\`\n> BPM: \`${map[0].bpm}\`\n> Mode: \`${map[0].mode}\`\n> Genre: \`${map[0].genre}\`\n> Difficulty: [ Rating: \`${Math.round(map[0].difficulty.rating)}\`, Aim: \`${Math.round(map[0].difficulty.aim)}\`, Size: \`${map[0].difficulty.size}\`, Drain: \`${map[0].difficulty.drain}\` ]**`, false)
                        .addField('Date', `> **Submit date: \`${Viola.time('MM-DD-YYYY`, `HH:mm:ss', map[0].raw_submitDate)}\`\n> Approved date: \`${Viola.time('MM-DD-YYYY`, `HH:mm:ss', map[0].raw_approvedDate)}\`\n> Last update: \`${Viola.time('MM-DD-YYYY`, `HH:mm:ss', map[0].raw_lastUpdate)}\`**`, false)
                    
                    message.reply(embed2)
                    }).catch(err => {
                    console.log(Viola.clean(err));
                    message.channel.send(`**~ An error happened... Sorry**`)
                });
                break;

            default:
                message.channel.send(new MessageEmbed().setTimestamp().setDescription('**osu** `[profile/beatmap]`').setColor(config.color))
                break;
        }
    },
};
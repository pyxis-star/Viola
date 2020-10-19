const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const config = require("../../../config.json");
const Viola = require("../../structures/utils");

module.exports = {
    config: {
        name: 'pokemon',
        aliases: ['poke'],
        cooldown: 10,
        category: 'Util',
        usage: 'pokemon [pokemon]',
        description: 'Pokemons!',
        clientPerms: ['EMBED_LINKS'],
        userPerms: []
    },
    run: async (client, message, args) => {
        if (!args.join(' ')) return;
        axios.get("https://some-random-api.ml/pokedex", {
            params: {
                pokemon: args.join(' ')
            }
        }).then(res => {
            let thumb = res.data.sprites.animated || 'https://w7.pngwing.com/pngs/236/1020/png-transparent-poke-ball-pixel-art-pokemon-pixelmon-lapis-theme-text-rectangle-pokemon.png'
            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setThumbnail(thumb)
                .setDescription(res.data.description)
                .setColor(config.color)
                .addField('Main', `> **Name: \`${res.data.name}\` (\`${res.data.id}\`)\n> Generation: \`${res.data.generation}\`\n> Type: \`${res.data.type}\`\n> Gender: \`${res.data.gender}\`\n> Exp base: \`${res.data.base_experience}\`\n> Abilities: \`${res.data.abilities}\`**`, false)
                .addField('Stats', `> **Hp: \`${res.data.stats.hp}\`\n> Attack: \`${res.data.stats.attack}\`\n> Defense: \`${res.data.stats.defense}\`\n> Speed: \`${res.data.stats.speed}\`\n> Sp Attack: \`${res.data.stats.sp_atk}\`\n> Sp Defense: \`${res.data.stats.sp_def}\`\n> TOTAL: \`${res.data.stats.total}\`**`, false)

            message.channel.send(embed);
        }).catch(error => {
            message.channel.send(`**~ An error happened... Sorry**`)
        });
    },
};
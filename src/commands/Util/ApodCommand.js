const { MessageEmbed } = require('discord.js');
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");
const apod = require('nasa-apod');
var clientnasa = new apod.Client({
	apiKey: process.env.NASA,
	conceptTags: true
});

module.exports = {
    config: {
        name: 'apod',
        aliases: ['nasa'],
        cooldown: 15,
        category: 'Util',
        usage: 'apod',
        description: 'Astronomy Picture of the Day!',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        clientnasa(new Date()).then(async function(body) {
            message.reply(new MessageEmbed().setTimestamp().setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true})).setImage(body.url).setTitle(body.title).setColor('#0b3d91').setDescription(body.explanation));
        }).catch(error => {
            console.log(Viola.clean(error));
            message.channel.send(`**~ Sorry... Without apod per hour**`);
        })
    },
};
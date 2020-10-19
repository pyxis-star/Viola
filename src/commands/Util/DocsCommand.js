const axios = require('axios');
const URL = "https://djsdocs.sorta.moe/v2/embed?src=stable";
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'docs',
        aliases: ['dcjs'],
        cooldown: 5,
        category: 'Util',
        usage: 'docs [item from discord.js]',
     	description: 'Documentation discord.js',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        args = args.splice(0).join(" ");
		if (!args) return;

     	const qParams = new URLSearchParams({ q: args });
     	axios.get(URL + `&${qParams.toString()}`)
        .then(response => {
      	message.channel.send({ embed: response.data })
      }).catch(err => {
            console.log(err);
            message.reply(`**~ Sorry, an error happened**`)
        });
},
};
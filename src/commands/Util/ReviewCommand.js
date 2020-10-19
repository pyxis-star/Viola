const axios = require('axios');
const tf = require('@tensorflow/tfjs-node');
const nsfw = require('nsfwjs');
const { MessageEmbed } = require('discord.js');
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'review',
        aliases: ['analyzes'],
        cooldown: 10,
        category: 'Util',
        usage: 'review [image url]',
        description: 'Analyzes an image',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        let review = args[0] || message.attachments.first().url
        if (!review) return;
        
        async function fn() {
  			const pic = await axios.get(`${review}`, {
    			responseType: 'arraybuffer',
  		});
  			const model = await nsfw.load();
  			const image = await tf.node.decodeImage(pic.data,3);
  			const predictions = await model.classify(image);
  
  			image.dispose();
            const embed = new MessageEmbed()
               .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
               .setTimestamp()
               .setColor(config.color)
               .setDescription(`**Neutral : \`${predictions.find(a => a.className == "Neutral").probability.toFixed(2).slice(2)}%\`\nDrawing : \`${predictions.find(a => a.className == "Drawing").probability.toFixed(2).slice(2)}%\`\nSexy : \`${predictions.find(a => a.className == "Sexy").probability.toFixed(2).slice(2)}%\`\nPorn : \`${predictions.find(a => a.className == "Porn").probability.toFixed(2).slice(2)}%\`\nHentai : \`${predictions.find(a => a.className == "Hentai").probability.toFixed(2).slice(2)}%\`**`)
            message.channel.send(embed)
		}
fn();
    },
};
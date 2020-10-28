const Tesseract = require('tesseract.js');
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'ocr',
        aliases: ['readimage'],
        cooldown: 25,
        category: 'Util',
        usage: 'ocr [image url]',
        description: 'Read text in image',
        userPerms: [],
        clientPerms: []
    },
    run: async (client, message, args) => {
        if (!args[0]) return;
        let image = message.channel.messages.cache.filter(msg => msg.attachments.size > 0).map(a => a.attachments.last().url).slice(0, 1)
        let ocr = args[0] || message.attachments.first().url || image 
        message.channel.startTyping();
		Tesseract.recognize(
  			`${ocr}`,
            'eng'
		).then(({ data: { text } }) => {
  			message.channel.send(text);
            message.channel.stopTyping();
		}).catch(err => message.reply(`\`\`\`\njs\n${Viola.clean(err)}\n``\`\`\``))
    },
};

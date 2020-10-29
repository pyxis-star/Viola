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
        let ocr = args[0] || message.attachments.first().url
        if (!ocr) return;
        message.channel.startTyping();
		Tesseract.recognize(
  			`${ocr}`,
            'eng'
		).then(({ data: { text } }, err) => {
            if (err) return message.reply(`**~Sorry, an error happened...**`)
  			message.channel.send(text);
            message.channel.stopTyping();
		})
    },
};

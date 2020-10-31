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
        if (!ocr.endsWith('.png')) return message.channel.send('**~ The image is not a png!**')
        message.channel.startTyping();
		Tesseract.recognize(
  			`${ocr}`,
            		 'eng'
		).then(({ data: { text } }, err) => {
  			message.channel.send(text);
            message.channel.stopTyping();
		})
    },
};

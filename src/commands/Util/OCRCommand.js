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
        if (!args) return;
        let ocr = args[0] || message.attachments.first().url
        message.channel.startTyping();
		Tesseract.recognize(
  			`${ocr}`,
  			'eng'
		).then(({ data: { text } }) => {
  			message.channel.send(text);
            message.channel.stopTyping();
		});
    },
};
const axios = require("axios");
const translate = require("@vitalets/google-translate-api");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'yo',
        aliases: ['talk', 'hi'],
        cooldown: 5,
        usage: 'chatbot [phrase]',
        category: 'Fun',
        description: 'try to talk to me',
        userPerms: [],
        clientPerms: []
    },
    run: async (client, message, args) => {
        if (!args) return message.channel.send('??');
        message.channel.startTyping()
        let msg = translate(args.slice(0).join(' '), {
            to: 'en'
        }).then(res => {
            axios.get('https://some-random-api.ml/chatbot', {
                params: {
                    message: res.text
                }
            }).then(async function (response) {
                message.channel.send(response.data.response)
                message.channel.stopTyping()
            });
        });
    },
}; 
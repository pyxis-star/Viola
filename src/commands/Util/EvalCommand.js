const { MessageEmbed } = require("discord.js");
const { inspect } = require("util");
const config = require("../../../config.json");
const Viola = require("../../structures/utils.js");

module.exports = {
    config: {
        name: 'eval',
        aliases: ['e', 'evl'],
        cooldown: 1,
        usage: 'eval',
        category: 'Owner',
        description: 'Void',
        userPerms: [],
        clientPerms: ['EMBED_LINKS']
    },
    run: async (client, message, args) => {
        if (message.author.id !== config.owner) return message.reply("No");

        function clean(text) {
            if (typeof text === 'string') {
                text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);

                return text.replace(new RegExp('gi'), '****');
            }
            return text;
        }

        let evaled;
        try {
            const hrStart = process.hrtime();
            evaled = eval(args.join(' '));
            if (evaled instanceof Promise) evaled = await evaled;
            const hrStop = process.hrtime(hrStart);
            const embed = new MessageEmbed()
                .addField(`Type:`, `\`\`\`js\n${typeof evaled}\n\`\`\``)
                .addField(`Response:`, `\`\`\`js\n${(((hrStop[0] * 1e9) + hrStop[1])) / 1e6}\n\`\`\``)
                .setColor(config.color)
            await message.channel.send(`\`\`\`js\n${clean(inspect(evaled, {
                depth: 0
            }))}\n\`\`\``, embed);
        } catch (err) {
            message.channel.send(`Error:\`\`\`js\n${clean(err)}\n\`\`\``)
        }
    },
};
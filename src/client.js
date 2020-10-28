const { Collection, Client, MessageEmbed } = require("discord.js");
const fs = require("fs");
const App = require("./app");
const chalk = require("chalk");
const config = require("../config.json");

module.exports = class extends Client {
    constructor(options = {}) {
        super(options)
			
        this.config = config;
        this.commands = new Collection();
        this.cooldown = new Collection();
        this.categories = fs.readdirSync('./src/commands/');
        this.aliases = new Collection();
        this.port = process.env.PORT || 3000;;
        this.Viola = require("./structures/utils");
        this.prefix = this.config.prefix;
 
        this.on("message", async (message) => {
            if (message.author.bot || message.channel.type === "dm") return;
            if (message.content === `<@!${this.user.id}>`) return message.reply(`**~ My prefix is \`${this.prefix}\`**`)
            if (!message.content.startsWith(this.config.prefix)) return;
            
            let mperms = (member, perms) => {
                const missing = member.permissions.missing(perms).map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``)

                return missing.length > 1 ? `${missing.slice(0, -1).join(", ")} ${re} ${missing.slice(-1)[0]}` : missing[0]
            }

            const args = message.content.slice(this.config.prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();

            const cmd = this.commands.get(command) || this.commands.get(this.aliases.get(command));

            if (cmd) {
                const now = Date.now();
                const timestamps = this.cooldown.get(cmd.config.name);
                const cooldownAmount = (cmd.config.cooldown || 3) * 1000;
                if (timestamps.has(message.author.id)) {
                    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now) / 1000;
                        return message.channel.send(new MessageEmbed().setTimestamp().setColor(config.color).setFooter(message.author.username).setDescription(`**Command in cooldown! Hang on ${timeLeft.toFixed(1)} second(s)!**`));
                    };
                };
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

                if (cmd.config.userPerms && !message.member.permissions.has(cmd.config.userPerms)) {
                    return message.channel.send(`**~ You need permission '\`${mperms(message.guild.me, cmd.config.clientPerms)}\`' to execute that command!**`);
                }
                if (cmd.config.clientPerms && !message.guild.me.permissions.has(cmd.config.clientPerms)) {
                    return message.channel.send(`**~ I need permission '\`${mperms(message.guild.me, cmd.config.clientPerms)}\`' to execute that command!**`);
                }

                try {
                    cmd.run(this, message, args);
                } catch (e) {
                    console.log(e);
                    return message.channel.send(`**~ An error occurred while executing the command! Sorry for the unforeseen!**`);
                };
            };
        });

    };

    async init() {
        ['command'].forEach(handler => {
            require(`./handlers/${handler}`)(this);
        });

        fs.readdir('./src/events', (err, files) => {
            if (err) {
                return console.error(err);
            }
            files.forEach(file => {
                if (!file.endsWith('.js')) return;
                const evnt = require(`./events/${file}`);
                let evntName = file.split('.')[0];
                console.log(`[ ${chalk.cyan('EVENTS')} ] - Event '${evntName}' loadded!`)
                this.on(evntName, evnt.bind(null, this));
            });
        });

        this.login(this.config.token).then(() => {
            const server = new App(this);
            server.init();
            console.log(`[ ${chalk.green("SYSTEM")} ] - Ok`);
        });
    };
};

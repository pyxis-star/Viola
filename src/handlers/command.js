const fs = require("fs"); 
const { Collection } = require("discord.js");

module.exports = (client) => {
  		fs.readdirSync('./src/commands/').forEach(dir => {
      		const commands = fs.readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
      		for (let file of commands) {
        		let draw = require(`../commands/${dir}/${file}`);
      		if (draw.config.name) {
        		client.commands.set(draw.config.name, draw);
      		} else {
        		continue;
      		}
      		if (draw.config.aliases) {
        		draw.config.aliases.forEach(alias => {
          			client.aliases.set(alias, draw.config.name);
        		});
      		};
           if (draw.config.cooldown) {
                   client.cooldown.set(draw.config.name, new Collection())
           }
      	}
    })
};
const { ShardingManager } = require('discord.js');
const chalk = require("chalk");
const manager = new ShardingManager('./bot.js', { token: require("./config.json").token,  totalShards: 'auto' });

manager.on('shardCreate', shard => console.log(`[ ${chalk.magenta("SHARDS")} ] - Launched shard ${shard.id}`));
manager.spawn();

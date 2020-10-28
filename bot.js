const Client = require("./src/client");
const dotenv = require("dotenv");
const { Intents } = require('discord.js');
const fs = require("fs");
const client =  new Client({ ws: { intents: Intents.ALL } });

dotenv.config({
    path: `${__dirname}/.env`
});

client.init();

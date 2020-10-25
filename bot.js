const Client = require("./src/client");
const dotenv = require("dotenv");
const fs = require("fs");
const client = new Client();

client.categories = fs.readdirSync('./src/commands');

dotenv.config({
    path: `${__dirname}/.env`
});

client.init();

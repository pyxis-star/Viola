const Client = require("./src/client");
const dotenv = require("dotenv");
const client = new Client();

dotenv.config({
    path: `${__dirname}/.env`
});

client.init();
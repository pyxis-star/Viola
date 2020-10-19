const express = require("express");
const http = require("http");
const app = express();

module.exports = class App {
    constructor(client) {
        this.client = client;
    };

    async init() {
        const server = http.createServer(app);
        server.listen(this.client.port);
    };
};
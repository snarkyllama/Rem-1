const express = require('express');
const fs = require('fs');

module.exports = class Website {
    constructor(client) {
        this.client = client;
        this.app = express();
        this.path = require('path');
        
        this.initProcess();
        this.setupRouters();
    }

    initProcess() {
        this.app.set('view engine', 'pug');
        this.app.set('views', this.path.join(__dirname, 'views'));
        this.app.use(express.static(this.path.join(__dirname, 'views')));
    }

    setupRouters() {
        fs.readdir('./routes', (routes) => {
            for (let i = 0; i < routes.length; i++) {
                const Route = require(`./routes/${routes[i]}`);
                const route = new Route(this.client);
                this.app.use(route.route, route.getRouter());
            }
        });
    }

    launch() {
        this.app.listen(3001, () => console.log('[WEBSITE] rembot.xyz is listening to port 3001~'));
    }
};
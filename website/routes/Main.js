const Route = require('./data/Route');

module.exports = class MainRoute extends Route {
    constructor(client) {
        super(client);

        this.router = require('express').Router();
        this.route = '/';
        this.init();
    }

    getRouter() { 
        return this.router; 
    }

    init() {
        this.router.get('/', (req, res) => {
            res.render('index.pug');
        });
    }
}
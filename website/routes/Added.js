const Route = require('./data/Route');
const express = require('express');

module.exports = class AddedRoute extends Route {
    constructor(client) {
        super(client);

        this.router = express.Router();
        this.route = '/added';

        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {
        this.router.get('/', (req, res) => {
            res.render('added.pug');
        });
    }
};
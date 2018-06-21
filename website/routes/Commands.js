const Route = require('./data/Route');

module.exports = class CommandsRoute extends Route {
    constructor(client) {
        super(client);

        this.router = require('express').Router();
        this.route = '/commands';
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {
        this.router.get('/', (req, res) => {
            let categories = [];
            this.client.cmds.forEach((command) => {
                if (!categories.includes(command.options.category)) categories.push(command.options.category);
            });

            res.render('commands.pug', {
                categories: categories.sort((a, b) => {
                    if (a > b) return 1;
                    if (b > a) return -1;

                    return 0;
                }),
                commands: Array.from(this.client.cmds).filter((command) => !command.options.owner)
            });
        });
    }
};
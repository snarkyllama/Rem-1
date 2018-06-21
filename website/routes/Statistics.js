const Route = require('./data/Route');

module.exports = class StatsisticsRoute extends Route {
    constructor(client) {
        super(client);

        this.router = require('express').Router();
        this.route = '/statistics';
    }

    getRouter() {
        return this.router;
    }

    init() {
        const mostUsedCommand = Object.keys(this.client.statistics.commandUsage).sort((a, b) => {
            if (this.client.statistics.commandUsage[a] < this.client.statistics.commandUsage[b]) return 1;
            if (this.client.statistics.commandUsage[a] > this.client.statistics.commandUsage[b]) return -1;
            return 0;
        })[0];

        this.router.get('/', (req, res) => {
            res.render('statistics.pug', {
                guilds: this.client.guilds.size,
                users: this.client.users.size,
                channels: Object.keys(this.client.channelGuildMap).length,
                commandsExecuted:this.client.statistics.commandsExecuted,
                messagesSeen: this.client.statistics.messages,
                commandUsage: {
                    command: mostUsedCommand || "No command hasn't been used~",
                    usage: this.client.statistics.commandUsage[mostUsedCommand] || 0
                },
                uptime: this.client.utils.formatDuration(this.client.uptime)
            });
        });
    }
}
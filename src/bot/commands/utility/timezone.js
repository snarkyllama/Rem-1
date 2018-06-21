const { Command } = require('../../../core');

module.exports = class TimezoneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'timezone',
            desc: "Gives the current time in the timezone",
            usage: "{prefix}timezone [time:str]",
            aliases: [
                'time'
            ],
            category: "Utility"
        });
    }

    execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must provide a timezone, here is a list of timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",
            color: this.client.utils.color
        });
        let timeZone = args[0];

        try {
            const time = new Date().toLocaleTimeString('en-US', { timeZone });
            ctx.send({
                description: `The current time in ${timeZone} is **${time}**`,
                color: this.client.utils.color
            });
        } catch(err) {
            ctx.send(':x: - Invalid timezone! Check here: <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>')
        }
    }
}
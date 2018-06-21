const { Command } = require('../../../core');

module.exports = class WhyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'why',
            desc: 'Gives an random why statement.',
            usage: '{prefix}why',
            category: 'Fun'
        });
    }

    async execute(ctx) {
        const { body } = await this.client.snek.get('https://nekos.life/api/v2/why');

        ctx.send({
            description: `:mega: **${body.why}**`,
            color: this.client.utils.color
        });
    }
};
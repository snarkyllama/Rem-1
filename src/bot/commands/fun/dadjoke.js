const { Command } = require('../../../core');

module.exports = class DadJoke extends Command {
    constructor(client) {
        super(client, {
            name: 'dadjoke',
            desc: 'Need a dad joke?',
            usage: '{prefix}dadjoke',
            aliases: [
                'dad-joke'
            ],
            examples: [
                'dadjoke'
            ],
            category: 'Fun'
        });
    }

    async execute(ctx) {
        try {
            const { body } = await ctx.client.snek
                .get('https://icanhazdadjoke.com')
                .set('Accept', 'application/json');
            
            return ctx.send({
                description: `:mega: **${body.joke}**`,
                color: ctx.client.utils.color
            });
        } catch(err) {
            return ctx.send({
                description: [
                    'Sorry, an error has occured while fetching it:',
                    `\`${err.name}: ${err.message}\``,
                    'Try again later~'
                ].join('\n'),
                color: ctx.client.utils.color
            });
        }
    }
};
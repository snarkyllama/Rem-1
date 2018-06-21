const { Command } = require('../../../core');

module.exports = class Dog extends Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            desc: 'Gets a random dog photograph.',
            usage: '{prefix}dog',
            category: 'Animals',
            examples: [
                'dog'
            ],
            aliases: [
                'doggo'
            ]
        });
    }

    async execute(ctx) {
        try {
            const { body } = await this.client.snek
                .get('https://dog.ceo/api/breeds/image/random');

            if (body.url === null) {
                return ctx.send({
                    description: `**${ctx.author.username}**: S-sorry, I c-couldn't fetch it...`,
                    color: ctx.client.utils.color
                });
            } else {
                return ctx.send({
                    title: "Click me if the image hasn't been cached.",
                    description: `**${ctx.author.username}**: Here is y-your doggo as r-requested:`,
                    url: body.message,
                    image: {
                        url: body.message
                    },
                    footer: {
                        icon_url: ctx.author.avatarURL,
                        text: `Powered by dog.ceo | Triggered by ${ctx.author.username}~`
                    },
                    color: ctx.client.utils.color
                });
            }
        } catch(err) {
            ctx.send({
                description: [
                    'Sorry, an error has occured while fetching it:',
                    `\`${err.title}: ${err.message}\``,
                    'Try again later~'
                ].join('\n'),
                color: ctx.client.utils.color
            });
        }
    }
};
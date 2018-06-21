const { Command } = require('../../../core');

module.exports = class Panda extends Command {
    constructor(client) {
        super(client, {
            name: 'panda',
            desc: 'Get a random panda photograph.',
            usage: '{prefix}panda',
            category: 'Animals',
            examples: [
                'panda'
            ]
        });
    }

    async execute(ctx) {
        try {
            const { body } = await this.client.snek
                .get('https://animals.anidiots.guide/panda');

            if (body.url === null) {
                return ctx.send({
                    description: `**${ctx.author.username}**: S-sorry, I c-couldn't fetch it...`,
                    color: ctx.client.utils.color
                });
            } else {
                return ctx.send({
                    title: "Click me if the image hasn't been cached.",
                    description: `**${ctx.author.username}**: Here is y-your panda as r-requested:`,
                    url: body.link,
                    image: {
                        url: body.link
                    },
                    footer: {
                        icon_url: ctx.author.avatarURL,
                        text: `Powered by animals.anidiots.guide | Triggered by ${ctx.author.username}~`
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
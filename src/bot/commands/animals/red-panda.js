const { Command } = require('../../../core');

module.exports = class RedPanda extends Command {
    constructor(client) {
        super(client, {
            name: 'red-panda',
            desc: 'Get a random red panda photograph.',
            usage: '{prefix}red-panda',
            category: 'Animals',
            examples: [
                'red-panda'
            ]
        });
    }

    async execute(ctx) {
        try {
            const { body } = await this.client.snek
                .get('https://animals.anidiots.guide/red_panda');

            if (body.url === null) {
                return ctx.send({
                    description: `**${ctx.author.username}**: S-sorry, I c-couldn't fetch it...`,
                    color: ctx.client.utils.color
                });
            } else {
                return ctx.send({
                    title: "Click me if the image hasn't been cached.",
                    description: `**${ctx.author.username}**: Here is y-your red panda as r-requested:`,
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
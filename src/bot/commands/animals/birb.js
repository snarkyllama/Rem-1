const { Command } = require('../../../core');

module.exports = class BirbCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'birb',
            desc: 'Gets a random birb photograph.',
            usage: '{prefix}birb',
            category: 'Animals',
            examples: [
                'birb'
            ],
            aliases: [
                'bird'
            ]
        });
    }

    async execute(ctx) {
        try {
            const { body } = await ctx.client.snek
                .get('http://random.birb.pw/tweet');

            if (body.url === null) {
                return ctx.send({
                    description: `**${ctx.author.username}**: S-sorry, I c-couldn't fetch it...`,
                    color: ctx.client.utils.color
                });
            } else {
                ctx.send({
                    title: "Click me if the image hasn't been cached.",
                    description: `**${ctx.author.username}**: Here is y-your bird as r-requested:`,
                    url: `http://random.birb.pw/img/${body}`,
                    image: {
                        url: `http://random.birb.pw/img/${body}`
                    },
                    footer: {
                        icon_url: ctx.author.avatarURL,
                        text: `Powered by random.birb.pw | Triggered by ${ctx.author.username}~`
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
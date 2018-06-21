const { Command } = require('../../../core');

module.exports = class RemCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rem',
            desc: "Gets a random Rem photograph",
            usage: '{prefix}rem',
            category: "Weebs",
            aliases: [
                'me'
            ]
        });
    }

    execute(ctx) {
        this.client.snek.get('https://augu.me/api/img/rem')
            .then((res) => ctx.send({
                title: "Click me if the image didn't cache correctly~",
                description: "It's just me, myself, and I~",
                image: {
                    url: res.body.url
                },
                color: this.client.utils.color,
                url: res.body.url,
                color: this.client.utils.color,
                footer: {
                    icon_url: ctx.author.avatarURL,
                    text: "Powered by augu.me"
                }
            }));
    }
};
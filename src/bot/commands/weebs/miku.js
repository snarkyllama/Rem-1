const { Command } = require('../../../core');

module.exports = class MangaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'miku',
            desc: 'Gets an random Hatsune Miku image.',
            usage: '{prefix}miku',
            category: 'Weebs'
        });
    }

    async execute(ctx) {
        this.client.snek
            .get('https://ohlookitsderpy.space/api/miku')
            .then((res) => {
                ctx.send({
                    title: "Click me if the image didn't cache~",
                    url: res.body.url,
                    image: {
                        url: res.body.url
                    },
                    color: this.client.utils.color,
                    footer: {
                        icon_url: ctx.author.avatarURL,
                        text: "Powered by ohlookitsderpy.space"
                    }
                });
            });
    }
};
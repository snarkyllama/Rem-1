const { Command } = require('../../../core');

module.exports = class TakagiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'takagi',
            desc: "Shows a random photograph of Takagi-san~",
            usage: '{prefix}takagi',
            category: "Weebs",
            aliases: [
                'takagi-san'
            ]
        });
    }

    execute(ctx) {
        this.client.snek.get('https://ohlookitsderpy.space/api/takagi')
            .then((res) => {
                ctx.send({
                    description: "Takagi-san! OwO",
                    title: "Click me if the image didn't cache",
                    url: res.body.url,
                    image: {
                        url: res.body.url
                    },
                    footer: {
                        icon_url: ctx.author.avatarURL,
                        text: "Powered by ohlookitsderpy.space"
                    },
                    color: this.client.utils.color
                });
            });
    }
};
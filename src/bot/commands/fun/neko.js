const { Command } = require('../../../core');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'neko',
            desc: 'Here is a neko. :3',
            usage: '{prefix}neko',
            category: "Fun",
            guild: true
        });
    }

    async execute(ctx) {
        this.client.snek.get('https://nekos.life/api/v2/img/neko')
            .then((res) => {
                let mentioned = ctx.mentions[0].id;
                ctx.send({
                    description: `${this.client.emojis.success} **—** <@${ctx.author.id}>: Here is your neko~`,
                    title: "Click me if the image didn't cache!",
                    image: {
                        url: res.body.url
                    },
                    color: this.client.utils.color,
                    url: res.body.url
                });
            });
    }
}
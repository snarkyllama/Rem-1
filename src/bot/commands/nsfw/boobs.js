const { Command } = require('../../../core');

module.exports = class BoobsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'boobs',
            desc: "Want some boobies?",
            usage: '{prefix}boobs',
            category: "NSFW",
            nsfw: true,
            guild: true
        });
    }

    execute(ctx) {
        this.client.sendChannelTyping(ctx.channel.id);

        this.client.snek.get('https://nekos.life/api/v2/img/boobs')
            .then((res) => {
                ctx.send({
                    description: `Here is some boobs. :smirk:`,
                    color: this.client.utils.color,
                    image: {
                        url: res.body.url
                    }
                });
            });
    }
};
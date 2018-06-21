const { Command } = require('../../../core');

module.exports = class AnalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anal',
            desc: "Want some anal?",
            usage: '{prefix}anal',
            category: "NSFW",
            nsfw: true,
            guild: true
        });
    }

    execute(ctx) {
        this.client.sendChannelTyping(ctx.channel.id);

        this.client.snek.get('https://nekos.life/api/v2/img/anal')
            .then((res) => {
                ctx.send({
                    description: `Here is some anal. :smirk:`,
                    color: this.client.utils.color,
                    image: {
                        url: res.body.url
                    }
                });
            });
    }
};
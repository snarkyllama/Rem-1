const { Command } = require('../../../core');

module.exports = class FutanariCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'futanari',
            desc: "I wonder what this is?",
            usage: '{prefix}futanari',
            category: "NSFW",
            nsfw: true,
            guild: true
        });
    }

    execute(ctx) {
        this.client.sendChannelTyping(ctx.channel.id);

        this.client.snek.get('https://nekos.life/api/v2/img/futanari')
            .then((res) => {
                ctx.send({
                    description: `Here is some futanari. :smirk:`,
                    color: this.client.utils.color,
                    image: {
                        url: res.body.url
                    }
                });
            });
    }
};
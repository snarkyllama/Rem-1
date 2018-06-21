const { Command } = require('../../../core');

module.exports = class AssCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ass',
            desc: "Want some ass?",
            usage: '{prefix}ass',
            category: "NSFW",
            nsfw: true,
            guild: true
        });
    }

    execute(ctx) {
        this.client.sendChannelTyping(ctx.channel.id);

        this.client.snek.get('https://nekobot.xyz/api/image?type=ass')
            .then((res) => {
                ctx.send({
                    description: `Here is some ass. :smirk:`,
                    color: this.client.utils.color,
                    image: {
                        url: res.body.message
                    }
                });
            });
    }
};
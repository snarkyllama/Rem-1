const { Command } = require('../../../core');

module.exports = class ThighCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'thigh',
            desc: "Some sexy thighs~ :3",
            usage: '{prefix}thigh',
            category: "NSFW",
            nsfw: true,
            guild: true
        });
    }

    execute(ctx) {
        this.client.sendChannelTyping(ctx.channel.id);

        this.client.snek.get('https://nekobot.xyz/api/image?type=thigh')
            .then((res) => {
                ctx.send({
                    description: `Here is some sexy thighs. :smirk:`,
                    color: this.client.utils.color,
                    image: {
                        url: res.body.message
                    }
                });
            });
    }
};
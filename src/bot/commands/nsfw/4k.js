const { Command } = require('../../../core');

module.exports = class K4Command extends Command {
    constructor(client) {
        super(client, {
            name: '4k',
            desc: "Get some 4k action~",
            usage: '{prefix}4k',
            category: "NSFW",
            nsfw: true,
            guild: true
        });
    }

    execute(ctx) {
        this.client.sendChannelTyping(ctx.channel.id);

        this.client.snek.get('https://nekobot.xyz/api/image?type=4k')
            .then((res) => {
                ctx.send({
                    description: `OwO some 4k action?! :smirk:`,
                    color: this.client.utils.color,
                    image: {
                        url: res.body.url
                    }
                });
            });
    }
};
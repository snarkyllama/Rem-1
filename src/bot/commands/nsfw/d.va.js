const { Command } = require('../../../core');

module.exports = class DVACommand extends Command {
    constructor(client) {
        super(client, {
            name: 'd.va',
            desc: "OwO",
            usage: '{prefix}d.va',
            category: "NSFW",
            nsfw: true,
            guild: true
        });
    }

    execute(ctx) {
        this.client.sendChannelTyping(ctx.channel.id);

        this.client.snek.get('https://api.computerfreaker.cf/v1/dva')
            .then((res) => {
                ctx.send({
                    description: `Here is some d.va stuff :smirk:`,
                    color: this.client.utils.color,
                    image: {
                        url: res.body.url
                    }
                });
            });
    }
};
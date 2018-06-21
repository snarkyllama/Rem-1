const { Command } = require('../../../core');

module.exports = class BlowJobCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'blowjob',
            desc: "Why in the hell you want to see someone get a blowjob?",
            usage: '{prefix}blowjob',
            category: "NSFW",
            nsfw: true,
            guild: true
        });
    }

    execute(ctx) {
        this.client.sendChannelTyping(ctx.channel.id);

        this.client.snek.get('https://nekos.life/api/v2/img/blowjob')
            .then((res) => {
                ctx.send({
                    description: `Here is a blowjob. :smirk:`,
                    color: this.client.utils.color,
                    image: {
                        url: res.body.url
                    }
                });
            });
    }
};
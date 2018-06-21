const { Command } = require('../../../core');

module.exports = class HentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hentai',
            desc: "Here is some hentai. :>",
            usage: '{prefix}hentai',
            category: "NSFW",
            nsfw: true,
            guild: true
        });
    }

    execute(ctx) {
        this.client.sendChannelTyping(ctx.channel.id);

        this.client.snek.get('https://api.computerfreaker.cf/v1/hentai')
            .then((res) => {
                ctx.send({
                    description: `Here is some hentai. :smirk:`,
                    color: this.client.utils.color,
                    image: {
                        url: res.body.url
                    }
                });
            });
    }
};
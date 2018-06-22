const { Command } = require('../../../core');

module.exports = class PatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pat',
            desc: 'Pat someone!',
            usage: '{prefix}pat <user:@mention>',
            category: "Reactions",
            guild: true
        });
    }

    async execute(ctx) {
        if (!ctx.mentions[0]) ctx.send({
            description: `${this.client.emojis.error} **—** You must mention a user!`,
            color: this.client.utils.color
        });

        this.client.snek.get('https://nekos.life/api/v2/img/pat')
            .then((res) => {
                let mentioned = ctx.mentions[0].id;
                ctx.send({
                    description: `${this.client.emojis.love} **—** <@${ctx.author.id}> is patting <@${mentioned}>! OwO`,
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
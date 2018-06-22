const { Command } = require('../../../core');

module.exports = class HugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            desc: 'Hug someone!',
            usage: '{prefix}hug <user:@mention>',
            category: "Reactions",
            guild: true
        });
    }

    async execute(ctx) {
        if (!ctx.mentions[0]) ctx.send({
            description: `${this.client.emojis.error} **—** You must mention a user!`,
            color: this.client.utils.color
        });

        this.client.snek.get('https://nekos.life/api/v2/img/hug')
            .then((res) => {
                let mentioned = ctx.mentions[0].id;
                ctx.send({
                    description: `${this.client.emojis.love} **—** <@${ctx.author.id}> is hugging <@${mentioned}>! I guess they love each other?`,
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
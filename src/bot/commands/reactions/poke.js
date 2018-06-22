const { Command } = require('../../../core');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poke',
            desc: 'Poke someone!',
            usage: '{prefix}poke <user:@mention>',
            category: "Reactions",
            guild: true
        });
    }

    async execute(ctx) {
        if (!ctx.mentions[0]) ctx.send({
            description: `${this.client.emojis.error} **—** You must mention a user!`,
            color: this.client.utils.color
        });

        this.client.snek.get('https://nekos.life/api/v2/img/poke')
            .then((res) => {
                let mentioned = ctx.mentions[0].id;
                ctx.send({
                    description: `${this.client.emojis.love} **—** <@${ctx.author.id}> is poking <@${mentioned}>! I guess <@${ctx.author.id}> loves to poke <@${mentioned}>?`,
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
const { Command } = require('../../../core');

module.exports = class AstolfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'astolfo',
            desc: "Gets a random Astolfo photograph",
            usage: '{prefix}astolfo',
            category: "Weebs"
        });
    }

    execute(ctx) {
        this.client.snek.get('https://augu.me/api/img/astolfo')
            .then((res) => ctx.send({
                title: "Click me if the image didn't cache correctly~",
                description: "Here he is, the trap himself: ***Astolfo***",
                image: {
                    url: res.body.url
                },
                color: this.client.utils.color,
                url: res.body.url,
                color: this.client.utils.color,
                footer: {
                    icon_url: ctx.author.avatarURL,
                    text: "Powered by augu.me"
                }
            }));
    }
};
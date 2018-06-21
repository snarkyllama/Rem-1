const { Command } = require('../../../core');

module.exports = class NoelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'noel',
            desc: "Gets a random Noel photograph",
            usage: '{prefix}noel',
            category: "Weebs"
        });
    }

    execute(ctx) {
        this.client.snek.get('https://augu.me/api/img/noel')
            .then((res) => ctx.send({
                title: "Click me if the image didn't cache correctly~",
                description: "Noel, a cute anime charater!",
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
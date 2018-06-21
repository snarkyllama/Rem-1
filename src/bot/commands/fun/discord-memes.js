const { Command } = require('../../../core');

module.exports = class DiscordMemesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'discord-memes',
            desc: "Gives a random discord meme!",
            usage: 'discord-memes',
            aliases: [
                'discordmemes'
            ],
            category: "Fun"
        });
    }

    async execute(ctx) {
        this.client.snek
            .get(`https://api.weeb.sh/images/random?type=discord_memes`)
            .set('Authorization', `Wolke ${this.client.config.tokens.weebsh}`)
            .then((result) => {
                ctx.send({
                    description: "Here is some discord memes",
                    title: "Click me if the image didn't cache correctly",
                    image: {
                        url: result.body.url
                    },
                    url: result.body.url,
                    footer: {
                        text: "Powered by weeb.sh",
                        icon_url: ctx.author.avatarURL
                    },
                    color: this.client.utils.color
                });
            });
    }
}
const { Command } = require('../../../core');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            desc: "Gets your avatar or another person's avatar.",
            usage: '{prefix}avatar <user:@mention|id|str>',
            category: "Utility",
            aliases: [
                'profile-picture'
            ]
        });
    }

    async execute(ctx, args) {
        if (!args[0]) {
            this.client.utils.resolveUser(ctx.author.id)
                .then((user) => {
                    ctx.send({
                        description: `Here is your avatar:`,
                        image: {
                            url: user.avatarURL || user.defaultAvatarURL
                        },
                        color: this.client.utils.color
                    });
                });
        } else {
            this.client.utils.resolveUser(args[0])
                .then((user) => {
                    ctx.send({
                        description: `Here is **${user.username}#${user.discriminator}**'s avatar:`,
                        image: {
                            url: user.avatarURL || user.defaultAvatarURL
                        },
                        color: this.client.utils.color
                    });
                });
        }
    }
}
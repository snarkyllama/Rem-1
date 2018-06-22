const { Command } = require('../../../core');

module.exports = class CreditsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'credits',
            desc: "Gives credit when credit is due.",
            usage: '{prefix}credits'
        });
    }

    execute(ctx) {
        ctx.send({
            description: `${this.client.emojis.love} **—** Thanks to these people who became apart of my development`,
            fields: [{
                name: "PassTheMayo",
                value: `Mayo helped Rem's development by using his code for Music Commands, \`xkcd\`, code for the Resolvers, and the Collection class. <3`,
                inline: true
            },
            {
                name: "Rem's Developers",
                value: "The developers helped by coding me and making me beautiful~",
                inline: true
            }],
            color: this.client.utils.color
        });
    }
}
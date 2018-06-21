const { Command } = require('../../../core');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            desc: "Make Rem say something!",
            usage: "{prefix}say <...text:str>",
            aliases: [
                'i-say'
            ],
            category: "Fun"
        });
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must provide text to make me say it!",
            color: this.client.utils.color
        });
        ctx.send({
            description: `:mega: **${args.join(" ")}**`,
            color: this.client.utils.color
        });
    }
};
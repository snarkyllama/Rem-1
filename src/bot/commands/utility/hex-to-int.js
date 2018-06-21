const { Command } = require('../../../core');

module.exports = class HexToIntCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hex-to-int',
            desc: "Gives the integer version of an hexadecimal.",
            usage: '{prefix}hex-to-int #<hexadecimal>',
            aliases: [
                "hti",
                "hextoint"
            ],
            category: 'Utility'
        });
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must provide an hexadecimal!",
            color: this.client.utils.color
        });

        let int = parseInt(args.join("").replace("#", ""), 16);

        ctx.send({
            description: `The integer version of \`${args[0]}\` is: \`${int}\`.`,
            color: this.client.utils.color
        });
    }
};
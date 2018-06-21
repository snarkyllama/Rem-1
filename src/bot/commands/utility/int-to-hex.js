const { Command } = require('../../../core');

module.exports = class IntToHexCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'int-to-hex',
            desc: 'Shows the hexadecimal of an integer.',
            usage: '{prefix}int-to-hex [integer]',
            aliases: [
                'inttohex',
                'ith'
            ],
            category: 'Utility'
        });
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must provide a integer to see what the hexadecimal is!",
            color: this.client.utils.color
        });

        let hex = (parseInt(args.join(""))).toString(16);

        ctx.send({
            description: `The hexadecimal version of \`${args[0]}\` is \`#${hex}\`.`,
            color: this.client.utils.color
        });
    }
};
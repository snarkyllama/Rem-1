const { Command } = require('../../../core');

module.exports = class ChooseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'choose',
            desc: 'Chooses 2 or more things!',
            usage: '{prefix}choose [...args1 | ...args2]',
            examples: [
                'choose Rem | Emilia'
            ],
            category: 'Utility'
        });
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must provide an argument.",
            color: this.client.utils.color
        });
        if (!args.join("").includes("|")) return ctx.send({
            description: "You must add a `|` to let me choose!",
            color: this.client.utils.color
        });

        let choose = args.join(" ").split("|").filter(x => x && x != " ");

        ctx.send({
            description: `I choose **${choose[Math.floor(Math.random()*(choose.length))].trim()}**~`,
            color: this.client.utils.color
        });
    }
};
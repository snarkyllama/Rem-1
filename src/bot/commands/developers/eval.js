const { Command } = require('../../../core');

module.exports = class EvalCommand extends Command {
    constructor(client) { 
        super(client, {
            name: "eval",
            desc: "Evaluates arbitrary JavaScript code.",
            usage: "{prefix}eval <...code>",
            aliases: [
                'ev'
            ],
            category: "Developers",
            owner: true
        }); 
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "Sorry, you will need to add some code to evaluate~",
            color: this.client.utils.color
        });

        let code = args.slice(0).join(" ");

        try {
            let evaled = eval(code);
            const clean = await this.client.clean(evaled);

            ctx.send({
                description: `:inbox_tray: __**Input**__:\n\`\`\`js\n${code}\`\`\`\n:outbox_tray: __**Output**__: \`\`\`js\n${clean}\`\`\``,
                color: this.client.utils.color
            });
        } catch(err) {
            let clean = await this.client.clean(err);
            ctx.send({
                description: `:inbox_tray: __**Input**__:\n\`\`\`js\n${code}\`\`\`\n:outbox_tray: __**Error**__: \`\`\`js\n${clean}\`\`\``,
                color: this.client.utils.color
            }); 
        }
    }
};
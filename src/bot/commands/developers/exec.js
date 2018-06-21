const { Command } = require('../../../core');
const { exec } = require('child_process');

module.exports = class EvalCommand extends Command {
    constructor(client) { 
        super(client, {
            name: "exec",
            desc: "Evaluates arbitrary Shell/Bash code.",
            usage: "{prefix}exec <...code>",
            category: "Developers",
            owner: true
        }); 
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "Sorry, you will need to add some code to execute~",
            color: this.client.utils.color
        });

        let code = args.slice(0).join(" ");

        exec(code, async(err, stdout, stderr) => {
            if (err) {
                ctx.send({
                    description: `:inbox_tray: __**Input**__:\`\`\`\n${code}\`\`\`\n:x: __**Error**__: \`\`\`\n${await this.client.clean(stderr)}\`\`\``,
                    color: this.client.utils.color
                });
            } else {
                ctx.send({
                    description: `:inbox_tray: __**Input**__:\`\`\`\n${code}\`\`\`\n:outbox_tray: __**Output**__: \`\`\`\n${await this.client.clean(stdout)}\`\`\``,
                    color: this.client.utils.color
                });
            }
        });
    }
};
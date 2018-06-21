const { Linter } = require('eslint');
const { Command } = require('../../../core');

module.exports = class ESLintCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'eslint',
            desc: "Verifies inputted JavaScript to see if there is any errors by ESLint.",
            usage: '{prefix}eslint <...code:str>',
            category: "Utility",
            guild: true
        });

        this.linter = new Linter();
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must provide code to execute it!",
            color: this.client.utils.color
        });

        const output = this.linter.verify(args.slice(0).join(" "), {
            env: {
				es6: true,
				node: true
			},
			extends: 'eslint:recommended',
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2018
			}
        }, { filename: 'input.js' });

        if (output.length < 1) return ctx.send({
            description: "There isn't errors in the code!",
            color: this.client.utils.color
        });

        ctx.send({
            title: "ESLint Error",
            description: `An error has occured while running the code!`,
            fields: [{
                name: '❯ Message',
                value: output[0].message,
            }, 
            {
                name: '❯ Location',
                value: `Line: ${output[0].line}\nColumn: ${output[0].column}`,
                inline: true
            },
            {
                name: '❯ Fatal',
                value: output[0].fatal ? "Yes" : "No",
                inline: true
            }],
            color: this.client.utils.color
        });
    }
}
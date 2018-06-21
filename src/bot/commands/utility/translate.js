const { Command } = require('../../../core');

module.exports = class TranslateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'translate',
            desc: "Translates text from one language to another language.",
            usage: '{prefix}translate <language:str> <...text:str>',
            category: "Utility"
        });

        this.translate = require('google-translate-api');
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must provide a language to translate! Here is an example: `en` for English",
            color: this.client.utils.color
        });
        if (!args[1]) return ctx.send({
            description: "You must provide text to translate!",
            color: this.client.utils.color
        });
        if (!this.client.utils.supportedLanguage(args[0])) return ctx.send({
            description: `Sorry, that isn't a supported language! Check [here](https://github.com/matheuss/google-translate-api/blob/master/languages.js) to see what are the supported languages.`,
            color: this.client.utils.color
        });

        this.translate(args.slice(1).join(" "), { to: args[0] })
            .then((result) => {
                ctx.send({
                    description: `:scroll: **${result.text}**`,
                    color: this.client.utils.color
                });
            });
    }
};
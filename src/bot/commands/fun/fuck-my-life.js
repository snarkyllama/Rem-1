const { Command } = require('../../../core');
const cheerio = require('cheerio');

module.exports = class FuckMyLife extends Command {
    constructor(client) {
        super(client, {
            name: 'fuck-my-life',
            desc: 'Grabs a "fuck my life" quote.',
            usage: '{prefix}fuck-my-life',
            aliases: [
                'fml',
                'fuckmylife',
                'fuccmylife',
                'fucc-my-life'
            ],
            examples: [
                'fuck-my-life'
            ],
            category: 'Fun'
        });
    }

    async execute(ctx) {
        try {
            const { body } = await ctx.client.snek.get('http://www.fmylife.com/random');
            const $ = cheerio.load(body);
            const quote = $('p.block.hidden-xs > a').first().text();

            ctx.send({
                description: `:mega: **${quote}**`,
                color: ctx.client.utils.color
            });
        } catch(err) {
            ctx.send({
                description: [
                    `An error has occured while running the \`fuck-my-life\` command:`,
                    `\`${err.name}: ${err.message}\``,
                    'Try again later~'
                ].join("\n"),
                color: ctx.client.utils.color
            });
        }
    }
};
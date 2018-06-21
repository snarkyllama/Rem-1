const { Command } = require('../../../core');

module.exports = class PassTheBeer extends Command {
    constructor(client) {
        super(client, {
            name: 'pass-a-beer',
            desc: 'Passes a beer to someone or have one alone...',
            usage: '{prefix}pass-the-beer @mention',
            aliases: [
                'beer'
            ],
            examples: [
                'beer',
                'pass-a-beer @void#0001'
            ],
            category: 'Fun'
        });
    }

    execute(ctx, args) {
        if (!args[0]) {
            ctx.send({
                description: `:beer: Here is your beer **${ctx.author.username}**~`,
                color: ctx.client.utils.color
            });
            return;
        } else if (ctx.author.id === '229552088525438977' && args[0] === '<@246574843460321291>' || args[0] === 'Blake') {
            ctx.send({
                description: `:beer: **void** gave a VB to **Blake**!`,
                color: ctx.client.utils.color
            });
            return;
        } else {
            ctx.send({
                description: `:beer: **${ctx.author.username}** passed a beer to **${ctx.mentions[0].username}**!`,
                color: ctx.client.utils.color
            });
            return;
        }
    }
};
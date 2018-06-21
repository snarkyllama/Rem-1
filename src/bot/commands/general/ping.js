const { Command } = require('../../../core');

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            desc: 'Gets the ping in milliseconds.',
            usage: '{prefix}ping',
            aliases: [
                'p'
            ],
            examples: [
                'ping'
            ]
        });

        this.reponses = [
            'to ping China',
            'to ping the International Space Station',
            'to play with Ram!',
            'to play with Emilia!',
            'to play with Subaru!',
            'to ping Chiaki',
            'to ping Charlotte',
            'to ping Hibiki',
            'to ping snarkullama',
            'to ping August~'
        ];
    }

    async execute(ctx) {
        let start = Date.now();

        await ctx.channel.createMessage(`:satellite: Hmm? You want my ping?`).then((message) => {
            message.delete();
            ctx.send({
                description: `:satellite: *It took ${Date.now() - start}ms ${this.reponses[Math.floor(Math.random() * this.reponses.length)]}*`,
                color: this.client.utils.color
            });            
        });
    }
};
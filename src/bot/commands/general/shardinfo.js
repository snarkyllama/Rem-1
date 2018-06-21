const { Command } = require('../../../core');

module.exports = class ShardinfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shardinfo',
            desc: 'Gets Rem\'s shard information.',
            usage: '{prefix}shardinfo',
            aliases: [
                'shards',
                'shard'
            ],
            examples: [
                'shardinfo'
            ]
        });
    }

    async execute(ctx) {
        ctx.channel.createMessage('Gathering shard info..')
            .then(async(msg) => {
                let shards = '';
                this.client.shards.map((s) => {
                    if (ctx.guild.id === s) {
                        shards += `Shard #${s.id} | Current Shard!`;
                    } else {
                        shards += `Shard #${s.id} | Latency: ${s.latency}ms | Status: ${s.status}`;
                    }
                }).join('\n');

                let currentGuildShard = ctx.guild.shard;
                await msg.delete();

                ctx.send({
                    title: "RemBot | Shard Info",
                    fields: [{
                        name: "❯ This Guild's Shard",
                        value: `Shard #${currentGuildShard.id} | Latency: ${currentGuildShard.latency}ms | Status: ${currentGuildShard.status}`
                    },
                    {
                        name: "❯ All Shards",
                        value: shards
                    }],
                    color: this.client.utils.color
                });
            });
    }
};
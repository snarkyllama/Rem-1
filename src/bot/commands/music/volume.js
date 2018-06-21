const { Command } = require('../../../core');

module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            desc: "Shows or set the current volume!",
            usage: '{prefix}volume [vol:int]',
            category: "Music",
            guild: true
        });
    }

    execute(ctx, args) {
        if (!ctx.user.voiceState.channelID) return ctx.send({
            description: ":x: You must be in a channel!",
            color: this.client.utils.color
        });
        if (!this.client.voiceConnections.has(ctx.guild.id)) return ctx.send({
            description: ":x: I'm not playing music in that channel.",
            color: this.client.utils.color
        });
        if (this.client.voiceConnections.get(ctx.guild.id).channelId !== ctx.user.voiceState.channelID) return ctx.send({
            description: ":x: I'm already playing music within another channel, please join that one!",
            color: this.client.utils.color
        });
        if (!this.client.queue.has(ctx.guild.id)) return ctx.send({
            description: ":x: I'm not currently playing music in `" + ctx.guild.name + "`",
            color: this.client.utils.color
        });

        const queue = this.client.queue.get(ctx.guild.id)
        
        if (args[0]) {
            if (isNaN(args[0])) return ctx.send({
                description: ":x: **-** The volume must be a number.",
                color: this.client.utils.color
            });
            if (Number(args[0]) < 1) return ctx.send({
                description: ":x: **-** The volume must be higher then `1`",
                color: this.client.utils.color
            });
            if (Number(args[0]) > 150) return ctx.send({
                description: ":x: **-** The volume must be lower or equal to `150`",
                color: this.client.utils.color
            });
            queue.setVolume(args[0]);
        }

        ctx.send({
            title: "Current Volume",
            description: '|' + (queue.volume >= 10 ? ('[' + Array(Math.floor(queue.volume / 10)).fill('─').join('') + '](https://rembot.xyz/discord)') : '') + Array(Math.floor(15 - (queue.volume / 10))).fill('─').join('') + '| `' + queue.volume + '`',
            color: this.client.utils.color
        });
    }
}
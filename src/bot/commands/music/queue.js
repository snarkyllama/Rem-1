const { Command } = require('../../../core');

module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            desc: "Shows the current queue.",
            usage: '{prefix}queue',
            aliases: [
                'q'
            ],
            category: 'Music',
            guild: true
        });
    }

    execute(ctx) {
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

        const queue = this.client.queue.get(ctx.guild.id);
        if (queue.queue.length < 2) return ctx.send({
            description: ":x: **-** There is no songs in the queue, how about queue some up?",
            color: this.client.utils.color
        });

        ctx.send({
            title: `${ctx.guild.name}'s Current Queue`,
            color: this.client.utils.color,
            description: `${queue.queue.slice(1).map(song => `**${(queue.queue.slice(1).indexOf(song) + 1)}** *-* \`${song.info.title}\``).join("\n")}`
        });
    }
}
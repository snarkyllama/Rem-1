const { Command } = require('../../../core');

module.exports = class ClearQueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear-queue',
            desc: "Clears the queue and song.",
            usage: '{prefix}clear-queue',
            category: "Music",
            guild: true
        });
    }

    async execute(ctx) {
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

        let queue = this.client.queue.get(ctx.guild.id);
        queue.clear();
    }
}
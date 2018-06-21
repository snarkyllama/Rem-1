const { Command } = require('../../../core');

module.exports = class NowPlayingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'now-playing',
            desc: "Shows the current song in the queue.",
            usage: '{prefix}now-playing',
            aliases: [
                'nowplaying',
                'now',
                'np'
            ],
            category: "Music",
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
        ctx.send({
            title: "Now Playing",
            description: `[${queue.nowPlaying.info.title}](${queue.nowPlaying.info.uri})`,
            fields: [{
                name: '❯ Author',
                value: queue.nowPlaying.info.author,
                inline: true
            },
            {
                name: '❯ Duration',
                value: this.client.utils.formatDuration(queue.position) + "/" + this.client.utils.formatDuration(queue.nowPlaying.info.length)
            }],
            image: {
                url: `https://img.youtube.com/vi/${queue.nowPlaying.info.identifier}/mqdefault.jpg`
            },
            color: this.client.utils.color
        });
    }
}
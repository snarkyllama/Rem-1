const {
    Command,
    VoiceConnection
} = require('../../../core');
const Util = require('../../../utils/Util');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            desc: "Plays a song!",
            usage: '{prefix}play <song:str>',
            aliases: [
                'add'
            ],
            category: "Music",
            guild: true
        });
    }

    execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "I can't play anything without a song to play!",
            color: this.client.utils.color
        });

        if (!ctx.user.voiceState.channelID) return ctx.send({
            description: ":x: You must be in a channel!",
            color: this.client.utils.color
        });
        if (this.client.voiceConnections.has(ctx.guild.id) && this.client.voiceConnections.get(ctx.guild.id).channelId != ctx.user.voiceState.channelID) return ctx.send({
            description: "I'm playing music within another voice channel, please join that channel to queue some music!",
            color: this.client.utils.color
        });

        const playlist = args.join(' ').match(/(\?|&)list=([a-zA-Z0-9\-_]+)/);
        const play = () => {
            this.client.utils.resolveTrack((/^https?:\/\//.test(args.join(' ')) ? '' : 'ytsearch:') + args.join(" "))
                .then((results) => {
                    if (results.length < 1) return ctx.send({
                        description: "No query hasn't been found.",
                        color: this.client.utils.color
                    });

                    if (this.client.voiceConnections.has(ctx.guild.id) && this.client.queue.has(ctx.guild.id)) {
                        this.client.queue.get(ctx.guild.id).queueSong(results, playlist);
                    } else {
                        this.client.utils.getPlayer(ctx.user.voiceState.channelID, ctx.guild)
                            .then((player) => {
                                this.client.queue.set(ctx.guild.id, new VoiceConnection(this.client, ctx.channel, player, results, playlist));
                            }).catch(e => this.client.log.error(e.stack));
                    }
                }).catch(e => this.client.log.error(e.stack));
        };

        if (playlist) {
            args = ['https://youtube.com/playlist?list=' + playlist[2]];
            this.client.snek
                .get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist[2]}&key=${this.client.config.tokens.youtube}&maxResults=0`)
                .then(() => {
                    play();
                });
        } else {
            play();
        }
    }
}
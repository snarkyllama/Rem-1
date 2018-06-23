module.exports = class VoiceConnection {
    constructor(_client, channel, player, results, playlist) {
		this.client = _client;
		this.player = player;
		this.queue = [];
		this.channel = channel;
        this.volume = 100;
        
		this.queueSong(results, playlist);
        this.playNext();
        
		this.player.on('end', this.songEnd.bind(this));
    }

    playNext() {
        this.player.play(this.queue[0].track);
        this.channel.createMessage({
            embed: {
                title: "Now Playing",
                description: `**${this.queue[0].info.title}**~`,
                color: this.client.utils.color,
                fields: [{
                    name: '❯ Duration',
                    value: `${this.client.utils.formatDuration(this.queue[0].info.length)}`,
                    inline: true
                },
                {
                    name: '❯ Stream',
                    value: this.queue[0].info.isStream ? "Yes" : "No",
                    inline: true
                }]
            }
        });
    }

    queueSong(results, playlist) {
        if (playlist) {
            this.queue.push(...results);
            this.channel.createMessage({
                embed: {
                    description: `:white_check_mark: Added \`${results.length}\` songs to the queue~`,
                    color: this.client.utils.color
                }
            });
        } else {
            if (this.queue.length > 0) this.channel.createMessage({
                embed: {
                    description: "Added to the Queue",
                    fields: [{
                        name: '❯ Song',
                        value: `**${results[0].info.title}**`
                    },
                    {
                        name: '❯ Author',
                        value: results[0].info.author,
                        inline: true
                    },
                    {
                        name: '❯ Duration',
                        value: this.client.utils.formatDuration(results[0].info.length),
                        inline: true
                    },
                    {
                        name: '❯ Position',
                        value: this.queue.length,
                        inline: true
                    }],
                    color: this.client.utils.color
                }
            });
            this.queue.push(results[0]);
        }
    }

    songEnd() {
		this.queue.splice(0, 1);
		if (this.queue.length > 0) return this.playNext();
		this.player.stop();
		this.client.leaveVoiceChannel(this.player.channelId);
		this.end();
    }

    end() {
        return this.channel.createMessage({
            embed: {
                description: ":eject: Thanks for using my music module, if you want more powerful bandwidth and stuff, Donate to me! You can donate [**here**](https://patreon.com/RemBotDiscord) and we can upgrade our servers and make music more powerful!",
                color: this.client.utils.color
            }
        });
    }

    clear() {
        this.queue = [];
        this.player.stop();
    }

    pause(bool) {
        this.player.pause(bool);
    }

    skip() {
        this.player.stop();
    }

    setVolume(vol) {
        this.player.setVolume(vol);
        this.volume = vol;
    }

    get paused() {
        return this.player.paused;
    }

    get nowPlaying() {
        return this.queue[0];
    }

    get position() {
        return this.player.state.position;
    }
};

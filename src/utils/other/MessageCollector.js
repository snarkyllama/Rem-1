const { EventEmitter: Emitter } = require('events');

/**
 * The `MessageCollector` class.
 * 
 * @author Wesselgame (Wessel)
 * @extends {EventEmitter}
 */
class MessageCollector extends Emitter {
    constructor(channel, author, filter, options = {}) {
        super();

        this.collected = [];
        this.listener = (msg) => this.verify(msg);
        this.channel = channel;
        this.client = channel.guild.shard.client;
        this.filter = filter;
        this.author = author;
        this.paused = false;
        this.ended = false;

        this.client.on('messageCreate', this.listener);
        if (options.time) setTimeout(() => this.stop('time'), options.time);
    }

    verify(msg) {
        if (this.channel.id !== msg.channel.id) return;
        if (this.author.id !== msg.author.id) return;

        this.collected.push(msg);
        this.emit('message', msg);
        if(this.collected.length >= this.options.maxMatches) this.stop('maxMatches');
        return true;
        // TODO: Wessel needs to fix `MessageCollector#filter`.
    }

    stop(reason) {
        if (this.ended) return;

        this.ended = true;
        this.client.removeListener('messageCreate', this.listener);
        this.emit('end', this.collected, reason);
    }

    pause() {
        if (this.paused) return;

        this.paused = true;
        this.client.removeListener('messageCreate', this.listener);
    }

    resume() {
        if (!this.paused) return;

        this.paused = false;
        this.client.on('messageCreate', this.listener);
    }
}

module.exports = MessageCollector;
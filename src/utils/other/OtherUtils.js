const MessageCollector = require('./MessageCollector');

module.exports.resolveString = (data) => {
    if (typeof data === 'string') return data;
    if (data instanceof Array) return data.join('\n');
    return String(data);
};

module.exports.resolveColor = (color) => {
    if (color < 0 || color > 0xFFFFFF) throw new RangeError('[OtherUtils#resolveColor]: Color must be a hexadecimal or an integer.');
    else if (color && isNaN(color)) throw new TypeError('[OtherUtils#resolveColor]: Color must be a number.');

    return color;
};

module.exports.cloneObject = (object) => {
    return Object.assign(Object.create(object), object);
};

module.exports.loadErisMods = (Eris) => {
    Object.defineProperties(Eris.TextChannel.prototype, {
        'isDM': {
            get() {
                return this.type === 1;
            }
        },
        'awaitMessages': {
            value: (msg, predicate, options = {}) => {
                const collector = new MessageCollector(msg.channel. msg.author);
                collector.on('end', (collected, reason) => {
                    return new Promise(resolve => {
                        if (reason === 'forced') return;
                        resolve(collected);
                    });
                });
            }
        }
    });

    return Eris;
};
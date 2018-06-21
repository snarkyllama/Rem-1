const Languages = {
    'auto': 'Automatic',
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'am': 'Amharic',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'ny': 'Chichewa',
    'zh-cn': 'Chinese Simplified',
    'zh-tw': 'Chinese Traditional',
    'co': 'Corsican',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'eo': 'Esperanto',
    'et': 'Estonian',
    'tl': 'Filipino',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Frisian',
    'gl': 'Galician',
    'ka': 'Georgian',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'ht': 'Haitian Creole',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'iw': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'ig': 'Igbo',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'jw': 'Javanese',
    'kn': 'Kannada',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali',
    'no': 'Norwegian',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ma': 'Punjabi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'es': 'Spanish',
    'su': 'Sundanese',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu'
};

class Util {
    constructor(client) {
        this.client = client;
    }

    get color() {
        return 11640025;
    }

    resolveChannel(channel, guild) {
        return new Promise((resolve, reject) => {
            if (/^\d+$/.test(channel)) {
                if (guild) {
                    if (!guild.channels.has(channel)) reject();
                    resolve(guild.channels.get(channel));
                } else {
                    const channel = channel in this.client.channelGuildMap && this.client.guilds.get(this.client.channelGuildMap[channel]).channels.get(channel);
                    if (channel) return resolve(channel);
                }
            } else if (/^<#(\d+)>$/.test(channel)) {
                const match = channel.match(/^<#(\d+)>$/);
                if (guild) {
                    if (!guild.channels.has(match[1])) reject();
                    resolve(guild.channels.get(match[1]));
                } else {
                    const channel = match[1] in this.client.channelGuildMap && this.client.guilds.get(this.client.channelGuildMap[match[1]]).channels.get(match[1]);
                    if (channel) return resolve(channel);
                }
            } else if (guild) {
                const channels = guild.channels.filter((channel) => channel.name.toLowerCase().includes(channel.toLowerCase()));
                if (channels.length > 0) return resolve(channels[0]);
            }
            reject();
        });
    }

    resolveGuild(query) {
        return new Promise((resolve, reject) => {
            if (/^\d+$/.test(query)) {
                const guild = this.client.guilds.get(query);
                if (guild) return resolve(guild);
            } else {
                const guilds = this.client.guilds.filter((guild) => guild.name.toLowerCase().includes(query.toLowerCase()));
                if (guilds.length > 0) return resolve(guilds[0]);
            }
            reject();
        });
    }

    resolveUser(query, guild) {
        return new Promise((resolve, reject) => {
            if (/^\d+$/.test(query)) {
                const user = this.client.users.get(query);
                if (user) return resolve(user);
            } else if (/^<@!?(\d+)>$/.test(query)) {
                const match = query.match(/^<@!?(\d+)>$/);
                const user = this.client.users.get(match[1]);
                if (user) return resolve(user);
            } else if (/^(.+)#(\d{4})$/.test(query)) {
                const match = query.match(/^(.+)#(\d{4})$/);
                const users = this.client.users.filter((user) => user.username === match[1] && Number(user.discriminator) === Number(match[2]));
                if (users.length > 0) return resolve(users[0]);
            } else {
                const users = this.client.users.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()));
                if (users.length > 0) return resolve(users[0]);
            }
            reject();
        });
    }

    resolveRole(query, guild) {
        return new Promise((resolve, reject) => {
            if (/^\d+$/.test(query)) {
                const role = guild.roles.get(query);
                if (role) return resolve(query);
            } else if (/^<@&(\d+)>$/.test(query)) {
                const match = query.match(/^<@&(\d+)>$/);
                const role = guild.roles.get(match[1]);
                if (role) return resolve(query);
            } else {
                const role = guild.roles.filter((role) => role.name.toLowerCase().includes(query.toLowerCase()));
                if (role.length > 0) return resolve(role[0]);
            }
            reject();
        });
    }

    formatDuration(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor(ms / 1000 / 60 / 60);
        return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    /** soon TM */
    postToBotLists() {
        if (this.client.config.oliyBots) {
            this.client.snek
                .post(`https://discordbots.org/api/bots/${this.client.utils.color}/stats`)
                .set('Authorization', this.client.config.oliyBots)
                .send({
                    server_count: this.client.guilds.size,
                    shard_count: this.client.shards.size
                })
                .end();
        }

        if (this.client.config.discordBots) {
            this.client.snek
                .post(`https://bots.discord.pw/api/bots/${this.client.utils.color}/stats`)
                .set('Authorization', this.client.config.oliyBots)
                .send({
                    server_count: this.client.guilds.size,
                    shard_count: this.client.shards.size
                })
                .end();
        }
    }

    /** @private */
    getCode(language) {
        if (!language) return false;
        language = language.toLowerCase();

        if (Languages[language]) return language;

        const keys = Object.keys(Languages).filter((key) => {
            if (typeof Languages[key] !== 'string') return false;

            return Languages[key].toLowerCase() === language;
        });

        return keys[0] || false;
    }

    supportedLanguage(language) {
        return Boolean(this.getCode(language));
    }

    resolveTrack(query) {
        return new Promise((res, rej) => {
            this.client.snek
                .get(`http://${this.client.config.lavalink.nodes[0].host}:2333/loadtracks?identifier=${query}`)
                .set('Authorization', this.client.config.lavalink.nodes[0].password)
                .then((result) => res(result.body))
                .catch((err) => rej(err));
        });
    }

    formatSize(bytes) {
        const kb = bytes / 1024;
        const mb = kb / 1024;
        const gb = mb / 1024;
        if (kb < 1024) return kb.toFixed(2).toLocaleString() + 'KB';
        if (kb > 1024 && mb < 1024) return mb.toFixed(2).toLocaleString() + 'MB';
        return gb.toFixed(0).toLocaleString() + 'GB';
    }

    getPlayer(channelID, guild) {
        const player = this.client.voiceConnections.get(guild.id);
        if (player) return Promise.resolve(player);
        return this.client.joinVoiceChannel(channelID);
    }
}

module.exports = Util;
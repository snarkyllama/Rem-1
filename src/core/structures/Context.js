const GuildSchema = require('../schemas/Guild');
const UserSchema = require('../schemas/User');

module.exports = class Context {
    constructor(client, msg) {
        Object.assign(this, msg);
        this.client = client;
    }

    get guild() {
        return this.channel.guild;
    }

    get user() {
        return this.guild && this.author && this.guild.members.get(this.author.id) || null;
    }

    send(content) {
        if (content instanceof Object) {
            this.channel.createMessage({
                embed: content
            });
        } else {
            this.channel.createMessage(content);
        }
    }

    getGuildSettings() {
        const gConfig = GuildSchema.findOne({ id: this.channel.guild.id });

        if (!gConfig) {
            const Guild = new GuildSchema({ id: this.channel.guild.id });
            Guild.save();
            // If any legacy guilds haven't been added \/
            return this.send({
                description: `${this.client.emojis.success} **—** Added \`${this.guild.name}\` to my database! Re-run another command to use me~`,
                color: this.client.utils.color
            });
        }

        return gConfig;
    }

    getUserSettings() {
        const uConfig = UserSchema.findOne({ id: this.author.id });

        if (!uConfig) {
            const User = new UserSchema({ id: this.author.id });
            User.save();
            // If any legacy uses haven't been added \/
            return this.send({
                description: `${this.client.emojis.success} **—** I have added you, <@${this.author.id} to the User database! Re-run another command to use me~`,
                color: this.client.utils.color
            });
        }

        return uConfig;
    }

    updateGuildSettings(options) {
        GuildSchema.update(options.condition, options.document, options.callback);
    }

    updateUserSettings(options) {
        UserSchema.update(options.condition, options.document, options.callback);
    }
};
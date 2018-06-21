const { Command } = require('../../../core');

module.exports = class UserInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            desc: 'Gets information about a user or yourself.',
            usage: 'userinfo <...user>',
            category: "Utility",
            aliases: [
                'user-info',
                'user'
            ],
            guild: true
        });

        this.emotes = {
            online: "<:remOnline:457289010037915660>",
            offline: "<:remOffline:457289010084184066>",
            idle: "<:remIdle:457289009912217612>",
            dnd: "<:remDND:457289032330772502>"
        };
    }

    async execute(ctx, args) {
        this.client.utils.resolveUser(args.length > 0 ? args.join(' ') : ctx.author.id)
            .then((member) => {
                let embed = {
                    title: "User Information",
                    fields: [{
                        name: '❯ Name (ID)',
                        value: `${member.username}#${member.discriminator} (\`${member.id}\`)`,
                        inline: true
                    },
                    {
                        name: '❯ Bot?',
                        value: member.bot ? "Yes" : "No",
                        inline: true
                    }],
                    color: this.client.utils.color,
                    thumbnail: {
                        url: member.avatarURL || member.defaultAvatarURL
                    }
                };

                if (ctx.guild.members.has(member.id)) {
                    let user = ctx.guild.members.get(member.id);

                    if (user.nick) {
                        embed.fields.push({
                            name: '❯ Nickname',
                            value: user.nick,
                            inline: true
                        });
                    }

                    embed.fields.push({
                        name: '❯ Status',
                        value: `${(user.status === 'online' ? this.emotes['online'] + " Online" : user.status === 'idle' ? this.emotes['idle'] + " Away" : user.status === 'dnd' ? this.emotes['dnd'] + " Do Not Disturb" : this.emotes['offline'] + " Offline")}`,
                        inline: true
                    });

                    embed.fields.push({
                        name: '❯ Roles',
                        value: user.roles.length,
                        inline: true
                    });

                    if (user.game) embed.description = `${(user.game.type === 0 ? 'Playing' : user.game.type === 1 ? 'Streaming' : user.game.type === 2 ? 'Listening to' : user.game.type === 3 ? 'Watching' : '') + ` **${user.game.name}**`}`;

                    if (user.voiceState.channelID && ctx.guild.channels.has(user.voiceState.channelID)) {
                        const vc = ctx.guild.channels.get(user.voiceState.channelID);

                        embed.fields.push({
                            name: '❯ Voice Channel',
                            value: vc.name,
                            inline: true
                        });

                        embed.fields.push({
                            name: '❯ Mute',
                            value: user.voiceState.mute || user.voiceState.self_mute ? "Yes" : "No",
                            inline: true
                        });

                        embed.fields.push({
                            name: '❯ Deaf',
                            value: user.voiceState.deaf || user.voiceState.self_deaf ? "Yes" : "No",
                            inline: true
                        });
                    }
                }

                ctx.send(embed);
            });
    }
};
const { Command } = require('../../../core');

module.exports = class ChannelInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'channelinfo',
            desc: 'Gives some information about a text channel or a voice channel',
            usage: '{prefix}channelinfo [#text | voice]',
            aliases: [
                'channel',
                'channel-info'
            ],
            examples: [
                'channelinfo #general',
                'channelinfo Music #1'
            ],
            category: 'Utility',
            guild: true
        });
    }

    async execute(ctx, args) {
        this.client.utils.resolveChannel(args.length > 0 ? args.join(' ') : ctx.channel.id, ctx.guild)
            .then((channel) => {
                let embed = {
                    description: `Here is some information about channel **${channel.name}**:`,
                    fields: [{
                        name: '❯ Name',
                        value: `${(channel.type === 0 ? "#" : "")}${channel.name}`,
                        inline: true
                    },
                    {
                        name: '❯ ID',
                        value: channel.id,
                        inline: true
                    },
                    {
                        name: '❯ Channel Type',
                        value: channel.type === 0 ? "Text" : channel.type === 2 ? "Voice" : channel.type === 4 ? "Category" : "Unknown",
                        inline: true
                    }],
                    color: this.client.utils.color
                };

                if (channel.type === 0) {
                    embed.fields.push({
                        name: '❯ NSFW?',
                        value: channel.nsfw ? "Yes" : "No",
                        inline: true
                    });
                }

                if (!ctx.guild || !ctx.guild.channels.has(channel.id)) {
                    const guild = this.client.guilds.get(this.client.channelGuildMap[channel.id]);

                    embed.fields.push({
                        name: '❯ Guild',
                        value: guild.name,
                        inline: true
                    });
                }

                if (channel.type !== 4 && channel.parentID) {
                    embed.fields.push({
                        name: '❯ Category',
                        value: channel.guild.channels.get(channel.parentID).name,
                        inline: true
                    });
                }

                if (channel.type === 2) {
                    embed.fields.push({
                        name: '❯ Users Connected',
                        value: channel.voiceMembers.size,
                        inline: true
                    });

                    embed.fields.push({
                        name: '❯ User Limit',
                        value: channel.userLimit,
                        inline: true
                    });
                }

                ctx.send(embed);
            });
    }
};
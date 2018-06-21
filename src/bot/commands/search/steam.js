const { Command } = require('../../../core');

module.exports = class SteamCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'steam',
            desc: 'Searches a Steam user.',
            usage: 'steam [user]',
            examples: [
                'steam voidius'
            ],
            category: 'Search'
        });
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must provide a user to search!",
            color: this.client.utils.color
        });

        this.client.snek
            .get(`https://api.alexflipnote.xyz/steam/user/${args[0]}`)
            .then((res) => {
                ctx.send({
                    title: "RemBot | Steam User Searching",
                    description: `Here is **${res.body.id.customurl}**'s Steam profile:`,
                    fields: [{
                        name: '❯ Favourite Group',
                        value: [
                            `**Name**: [${res.body.favgroup.name}](${res.body.favgroup.url})`,
                            `**Member Count**: ${res.body.favgroup.member_count}`,
                            `**Members In-game**: ${res.body.favgroup.members_in_game}`,
                            `**Members In-chat**: ${res.body.favgroup.members_in_chat}`,
                            `**Members Online**: ${res.body.favgroup.members_online}`
                        ].join('\n'),
                        inline: true
                    },
                    {
                        name: '❯ Misc',
                        value: [
                            `**Joined at**: ${res.body.profile.timecreated}`,
                            `**Status**: ${res.body.profile.state}`
                        ].join('\n'),
                        inline: true
                    }],
                    thumbnail: {
                        url: res.body.avatars.avatarfull
                    },
                    color: this.client.utils.color
                });
            })
            .catch((error) => {
                ctx.send({
                    description: [
                        'An error has occured while the `steam` command:',
                        `\`${error.message}\``,
                        `Try again later~`
                    ].join('\n'),
                    color: this.client.utils.color
                });
            });
    }
};
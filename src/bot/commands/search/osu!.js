const { Command } = require('../../../core');

module.exports = class OsuCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'osu!',
            desc: 'Gets an osu!user or a osu!beatmap.',
            usage: '{prefix}osu! [user|beatmap] [mode] [username|id]',
            aliases: [
                'osu'
            ],
            examples: [
                'osu! user std ohlookitsAugust'
            ],
            category: 'Search',
            enabled: false
        });
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must provide an argument!",
            color: this.client.utils.color
        });

        if (args[0].toLowerCase() === 'user') {
            if (!args[1]) return ctx.send({
                description: "You must provide a mode.\nAvaliable Modes: `standard`, `taiko`, `ctb`, `mania`",
                color: this.client.utils.color
            });
            if (!args[2]) return ctx.send({
                description: "You must provide a user to search!",
                color: this.client.utils.color
            });

            this.getOsuUser(ctx, args[2].toString(), args[1].toString());
        }
    }

    async getOsuUser(ctx, user, mode = 'standard') {
        const m = ctx.channel.createMessage(`:mag: Looking for user \`${user}\`...`);

        switch (mode.toString()) {
            case "standard":
            case "std":
                this.client.snek
                    .get(`https://osu.ppy.sh/api/get_user`)
                    .query({
                        k: this.client.config.tokens.osu,
                        u: user,
                        m: 0
                    })
                    .then((res) => {
                        let data = res.body[0];
                        let lemmmy = `http://lemmmy.pw/osusig/sig.php?colour=hex87cefa&uname=ohlookitsAugust&mode=0&pp=2&countryrank&onlineindicator=undefined&xpbar`;

                        m.delete();

                        ctx.send({
                            description: `Here is **${data.username}** (${data.user_id})'s osu!standard statistics:`,
                            color: this.client.utils.color,
                            url: `https://osu.ppy.sh/u/${data.user_id}`,
                            fields: [{
                                name: '❯ SS, S, A Ranks',
                                value: [
                                    `**SS**: ${data.count_rank_ss}`,
                                    `**S**: ${data.count_rank_s}`,
                                    `**A**: ${data.count_rank_a}`
                                ].join("\n"),
                                inline: true
                            },
                            {
                                name: '❯ Misc',
                                value: [
                                    `**Play Count**:`
                                ]
                            }],
                            image: {
                                url: lemmmy
                            }
                        });
                    });
        }
    }

    async getOsuBeatmap(ctx, id) {}
};
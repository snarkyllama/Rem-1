const { Command } = require('../../../core');

module.exports = class GitHubCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'github',
            desc: 'Searches for a GitHub repository.',
            usage: '{prefix}github [user/repo]',
            aliases: [
                'git'
            ],
            examples: [
                'github torqueink charlotte'
            ],
            category: 'Search'
        });
    }

    async execute(ctx, args) {
        if (!args[0] || !args[1]) return ctx.send({
            description: "You must provide an argument.",
            color: ctx.client.utils.color
        });

        this.client.snek
            .get(`https://api.github.com/repos/${args[0]}/${args[1]}`)
            .then((res) => {
                ctx.send({
                    title: res.body.full_name,
                    description: res.body.description ? res.body.description : "No description.",
                    fields: [{
                        name: "❯ Misc",
                        value: [
                            `Stars: **${res.body.stargazers_count}**`,
                            `Forks: **${res.body.forks}**`,
                            `Issues: **${res.body.open_issues}**`,
                            `Language: **${res.body.language || "???"}**`,
                            `Creation Date: **${new Date(res.body.created_at).toDateString()}**`,
                            `Last Modified At: **${new Date(res.body.updated_at).toDateString()}**`
                        ].join('\n'),
                        inline: true
                    }],
                    color: this.client.utils.color
                });
            })
            .catch((error) => {
                if (error.code === '404') return ctx.send({
                    description: "No repository has been found.",
                    color: this.client.utils.color
                });

                ctx.send({
                    description: [
                        "Sorry, an error has occured while running the `github` command:",
                        `\`${error.name}: ${error.message}\``,
                        "This isn't our fault - this must has to do with the GitHub API, so try again later!"
                    ].join('\n'),
                    color: this.client.utils.color
                });
            });
    }
};
const {
    Command
} = require('../../../core');

module.exports = class NPMCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'npm',
            desc: 'Rem will discover a NPM package for you!',
            usage: '{prefix}npm [package]',
            aliases: [
                'npmsearch'
            ],
            examples: [
                'npm hentai.js',
                'npmsearch umi-log'
            ],
            category: 'Search'
        });
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must provide a NPM package!",
            color: this.client.utils.color
        });

        ctx.channel.createMessage(`:package: Looking up for \`${args[0]}\`...`)
            .then(async(m) => {
                let pkg = encodeURIComponent(args[0].replace(/ /, '-'));

                const { body } = await this.client.snek.get(`https://registry.npmjs.com/package/${pkg}`);
                if (body.time.unpublished) return m.edit(`The package was unpublished from NPM.`);
                const version = body.versions[body["dist-tags"].latest];
                const maintainers = body.maintainers.map((u) => u.name);
                const dependencies = version.dependencies ? Object.keys(version.dependencies) : null;

                await m.delete();

                ctx.send({
                    title: body.name,
                    url: `https://npmjs.com/package/${body.name}`,
                    description: body.description || "No description~",
                    fields: [{
                        name: '❯ Version',
                        value: `v${body["dist-tags"].latest}`,
                        inline: true
                    },
                    {
                        name: '❯ License',
                        value: body.license || "No license?",
                        inline: true
                    },
                    {
                        name: '❯ Author',
                        value: body.author.name || 'No author?',
                        inline: true
                    },
                    {
                        name: "❯ Created at",
                        value: new Date(body.time.created).toDateString(),
                        inline: true
                    },
                    {
                        name: '❯ Modified at',
                        value: new Date(body.time.modified).toDateString(),
                        inline: true
                    },
                    {
                        name: '❯ Main File',
                        value: version.main || "index.js",
                        inline: true
                    },
                    {
                        name: '❯ Keywords',
                        value: body.keywords ? `\`${body.keywords.join("`, `")}\`` : "None.",
                        inline: true
                    },
                    {
                        name: '❯ Maintainers',
                        value: `**${maintainers.join("**, **")}**`,
                        inline: true
                    },
                    {
                        name: '❯ Dependencies',
                        value: `\`${dependencies.join("`, `")}\``,
                        inline: true
                    }],
                    color: this.client.utils.color
                });
            });
    }
};
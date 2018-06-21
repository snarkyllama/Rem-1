const { Command, GuildSchema } = require('../../../core');
const emotes = {
    Animals: ":dog:",
    Developers: ":tools:",
    //Economy: ":yen:",
    Fun: ":tada:",
    General: ":information_source:",
    Music: ":musical_note:",
    NSFW: ":underage:",
    Reactions: "<:yandereAAAAAAAAA:459383306560077825>",
    Search: ":mag:",
    Utility: ":hammer_pick:",
    Weebs: "<:RemNooooooo:447279660372590632>"
};

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            desc: 'Shows full documentation on a command or an alias or gives my full list of commands that I have!',
            usage: '{prefix}help [command/alias]',
            aliases: [
                'commands',
                'cmds',
                'command',
                'halp'
            ],
            examples: [
                'help',
                'command ping'
            ]
        });
    }

    async execute(ctx, args) {
        const categories = {};
        let guild = await GuildSchema.findOne({ id: ctx.guild.id });

        if (!args[0]) {
            for (const cmd of this.client.cmds) {
                if (cmd.options.owner && !['280158289667555328', '387043512232968193', '229552088525438977'].includes(ctx.author.id)) continue;

                let uwu = categories[cmd.options.category];

                if (!uwu) {
                    uwu = categories[cmd.options.category] = [];
                }

                uwu.push(cmd.options.name);
            }

            return ctx.send({
                description: `__**RemBot's Commands**__\n\tGuild Prefix: \`${guild.prefix.toString()}\`\n\tTo get extended help on a command, do \`${guild.prefix.toString()}help [command]\`\n\tTo execute a command, do \`${guild.prefix.toString()}<command>\` by replacing \`<command>\` the command you want!`,
                fields: Object.keys(categories).map(c => ({
                    name: `${c in emotes ? emotes[c] : ":question:"} ${c}`,
                    value: "`" + categories[c].join('`, `') + "`"
                })),
                color: ctx.client.utils.color
            });
        }

        const command = this.client.cmds.find((c) => c.options.name.includes(args[0]) || c.options.aliases.includes(args[0]));

        if (!command) return ctx.send({
            description: `Command \`${args[0]}\` was not found!`,
            color: this.client.utils.color
        });

        let embed = {
            title: `Command ${command.options.name}`,
            description: `***${command.options.desc}***`,
            fields: [{
                name: '❯ Usage',
                value: command.options.usage.replace('{prefix}', guild.prefix.toString()),
                inline: true
            },
            {
                name: '❯ Category',
                value: command.options.category,
                inline: true
            }],
            color: this.client.utils.color
        };

        if (command.options.aliases > 0) embed.fields.push({
            name: '❯ Aliases',
            value: `**${command.options.aliases.join(', ')}**`,
            inline: true
        });

        if (command.options.examples > 0) embed.fields.push({
            name: '❯ Examples',
            value: `**${command.options.examples.join(', ')}**`,
            inline: true
        });

        embed.fields.push({
            name: '❯ Guild Only',
            value: command.options.guild,
            inline: true
        });
        embed.fields.push({
            name: '❯ Owner Only',
            value: command.options.owner,
            inline: true
        });
        embed.fields.push({
            name: '❯ NSFW',
            value: command.options.nsfw,
            inline: true
        });

        return ctx.send(embed);
    }
};
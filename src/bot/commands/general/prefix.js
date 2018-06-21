const { Command, GuildSchema } = require('../../../core');

module.exports = class PrefixCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prefix',
            desc: 'Shows you the current prefix or changes the prefix.',
            usage: '{prefix}prefix [prefix]',
            examples: [
                'prefix',
                'prefix ;;'
            ]
        });
    }

    async execute(ctx, args) {
        const gConfig = ctx.getGuildSettings();

        if (!args[0]) return ctx.send({
            description: [
                '__**Current Prefixes**__:',
                `<@447229568282132510> [command]`,
                'rem [command]',
                '!r.[command]',
                `${gConfig.prefix.toString()}[command]`
            ].join('\n'),
            color: this.client.utils.color
        });

        if (!ctx.channel.permissionsOf(ctx.author.id).has('manageGuild') && !['280158289667555328', '387043512232968193', '229552088525438977'].includes(ctx.author.id)) {
            return ctx.send({
                description: "You must have the **`Manage Guild`** permission or be the bot's developers",
                color: this.client.utils.color
            });
        }

        let prefix = args.join(" ");

        if (prefix > 10) return ctx.send({
            description: "The prefix must be less then 10 characters long.",
            color: this.client.utils.color
        });
        if (gConfig.prefix === prefix) return ctx.send({
            description: "That is the prefix!",
            color: this.client.utils.color
        });

        ctx.updateGuildSettings({
            condition: {
                id: ctx.guild.id
            },
            document: {
                prefix
            },
            callback: (error) => {
                if (error) return ctx.send({
                    description: `${this.client.emojis.error} **—** An error has occured while editing the prefix! Try again later~`,
                    color: this.client.utils.color
                });

                ctx.send({
                    description: `${this.client.emojis.success} **—** Prefix has been set into stone! You can use \`${prefix}help\` or <@${this.client.user.id}>`
                });
            }
        });
    }
};
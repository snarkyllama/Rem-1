const { Context } = require('../../core');

module.exports = {
    name: 'messageCreate',
    execute: async(client, msg) => {
        client.statistics.messages++;
        if (msg.author.bot || !client.ready) return;

        const ctx = new Context(client, msg);
        const gConfig = await ctx.getGuildSettings();
        const uConfig = await ctx.getUserSettings();

        let prefix = new RegExp(`^<@!?${client.user.id}> |^${client.config.prefix.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}|^${'!r.'.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')} |^${gConfig.prefix.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}`)
            .exec(msg.content);

        if (msg.content.match(new RegExp(`^<@!?${client.user.id}>$`))) {
            ctx.send({
                description: `:wave: I am RemBot, a discord bot made in the [Eris](https://abal.moe/Eris) library. You pinged me without a command, please use the following prefixes:\n\n\`\`\`\n=-= PREFIXES =-=\n\n@mention <command>\n!r.<command>\n${gConfig.prefix.toString()}<command>\n${client.config.prefix}<command>\`\`\``,
                color: client.utils.color
            });
        }
        
        if (!prefix[0]) return;

        const args = msg.content.slice(prefix[0].length).trim().split(/ +/g);
        let command = args.shift();
        let cmd = client.cmds.find((c) => c.options.name === command || c.options.aliases.includes(command));

        if (!command) return;

        if (cmd.options.guild && msg.channel.isDM) {
            return ctx.send({
                description: `Command \`${cmd.options.name}\` has errored: \`You must be in a guild to execute the command.\``,
                color: client.utils.color
            });
        }
    
        if (cmd.options.nsfw && !msg.channel.nsfw) {
            return ctx.send({
                description: `Command \`${cmd.options.name}\` has errored: \`You must be in a NSFW channel to execute the command.\``,
                color: client.utils.color
            });
        }

        if (cmd.options.owner && !['280158289667555328', '387043512232968193', '229552088525438977'].includes(msg.author.id)) {
            return ctx.send({
                description: `Command \`${cmd.options.name}\` has errored: \`You don't own this bot.\``,
                color: client.utils.color
            });
        }

        try {
            client.statistics.commandUsage[cmd.options.name] = (client.statistics.commandUsage[cmd.options.name] || 0) + 1;
            client.statistics.commandsExecuted++;
            client.webhook.send({
                title: "A command has been executed~",
                description: [
                    `❯ **Command**: ${cmd.options.name}`,
                    `❯ **User**: ${ctx.author.username} (\`${ctx.author.id}\`)`,
                    `❯ **Guild**: ${ctx.guild.name} (\`${ctx.guild.id}\`)`
                ].join('\n'),
                color: client.utils.color
            });
            await cmd.execute(ctx, args);
        } catch(err) {
            ctx.send({
                description: [
                    `Uhh, the command \`${cmd.options.name}\` has errored:`,
                    `\`\`\`js\n${err.name}: ${err.message}\`\`\``,
                    'If the command continues to error, this *could* mean that there\'s a fault in the code - please contact <@280158289667555328> on the official server at ***<https://rembot.xyz/discord>***~'
                ].join('\n'),
                color: client.utils.color
            });
            client.webhook.send({
                title: "A command has errored!",
                description: `\`\`\`js\n${err.stack}\`\`\`\``,
                color: client.utils.color
            });
            client.log.error(err.stack);
        }
    }
};
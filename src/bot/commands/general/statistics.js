const { Command } = require('../../../core');
const { VERSION } = require('eris');

module.exports = class StatisticsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'statistics',
            desc: 'Shows Rem\'s realtime statistics.',
            usage: '{prefix}statistics',
            aliases: [
                'bot',
                'stats'
            ],
            examples: [
                'statistics'
            ]
        });
    }

    execute(ctx) {
        const mostUsedCommand = Object.keys(this.client.statistics.commandUsage).sort((a, b) => {
            if (this.client.statistics.commandUsage[a] < this.client.statistics.commandUsage[b]) return 1;
            if (this.client.statistics.commandUsage[a] > this.client.statistics.commandUsage[b]) return -1;
            return 0;
        })[0];

        ctx.send({
            title: "RemBot | Realtime Statistics",
            fields: [{
                name: '❯ Misc',
                value: [
                    `**Guilds**: ${this.client.guilds.size}`,
                    `**Users**: ${this.client.users.size}`,
                    `**Channels**: ${Object.keys(this.client.channelGuildMap).length}`,
                    `**Commands**: ${Object.keys(this.client.cmds).length}`,
                    `**Messages Seen**: ${this.client.statistics.messages}`,
                    `**Commands Executed**: ${this.client.statistics.commandsExecuted}`,
                    `**Uptime**: ${this.client.utils.formatDuration(this.client.uptime)}`,
                    `**Most Used Command**: ${mostUsedCommand || 'n/a'} (${this.client.statistics.commandUsage[mostUsedCommand] || 0})`,
                    `**Memory Usage**: ${this.client.utils.formatSize(process.memoryUsage().heapUsed)}`
                ].join('\n'),
                inline: true
            },
            {
                name: `❯ Version Related`,
                value: [
                    `**Eris**: v${VERSION}`,
                    `**Node.js**: ${process.version}`,
                    `**Rem**: v${require('../../../../package.json').version}`
                ].join('\n'),
                inline: true
            }],
            color: this.client.utils.color
        });
    }
};
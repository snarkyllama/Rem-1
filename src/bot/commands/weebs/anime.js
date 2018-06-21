const Kitsu = require('kitsu');
const { Command } = require('../../../core');

module.exports = class AnimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anime',
            desc: 'Search an anime from kitsu.io!',
            usage: '{prefix}anime [<anime:str>]',
            category: 'Weebs',
            examples: ['anime Acchi Kocchi'],
            aliases: ['animu']
        });

        this.kitsu = new Kitsu();
    }

    async _makeEmbed(ctx, data) {
        const {
            titles, subtype, startDate, endDate, popularityRank, id, synopsis, episodeCount
        } = data;

        ctx.send({
            title: `${titles.en} | ${titles.en_jp}`,
            description: synopsis.substring(0, 1000) + '...',
            fields: [{
                name: '❯ Start/End Date',
                value: `${startDate}/${endDate || 'In progress!'}`,
                inline: true
            },
            {
                name: '❯ Popularity Rank',
                value: popularityRank,
                inline: true
            },
            {
                name: '❯ Show Type',
                value: subtype,
                inline: true
            },
            {
                name: '❯ Episodes',
                value: episodeCount,
                inline: true
            }],
            url: `https://kitsu.io/anime/${id}`,
            color: this.client.utils.color
        });
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must add an anime to search it!",
            color: this.client.utils.color
        });

        const { data } = await this.kitsu.fetch('anime', {
            filter: {
                text: args.join('-')
            }
        });

        await this._makeEmbed(ctx, data[0]);
    }
};
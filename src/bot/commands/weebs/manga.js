const Kitsu = require('kitsu');
const { Command } = require('../../../core');

module.exports = class MangaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'manga',
            desc: 'Search an manga from kitsu.io!',
            usage: '{prefix}manga [<manga:str>]',
            category: 'Weebs'
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
            }],
            url: `https://kitsu.io/manga/${id}`,
            color: this.client.utils.color
        });
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must add an manga to search it!",
            color: this.client.utils.color
        });

        const { data } = await this.kitsu.fetch('manga', {
            filter: {
                text: args.join('-')
            }
        });

        await this._makeEmbed(ctx, data[0]);
    }
};
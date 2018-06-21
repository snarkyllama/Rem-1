const { resolveString, resolveColor, cloneObject } = require('../Util');

class EmbedBuilder {
    constructor(data) {
        this._setup(data);
    }

    /**
     * Setups the data.
     * 
     * @param {Object} data The data repesented.
     */
    _setup(data) {
        this.title = data.title;
        this.description = data.description;
        this.url = data.url;
        this.color = data.color;
        this.timestamp = data.timestamp ? new Date(data.timestamp).getTime() : null;
        this.thumbnail = data.thumbnail ? {
            url: data.thumbnail.url
        } : null;
        this.image = data.image ? {
            url: data.image.url
        } : null;
        this.footer = data.footer ? {
            text: data.footer.text,
            icon_url: data.footer.iconURL || data.footer.icon_url
        } : null;
        this.author = data.author ? {
            name: data.author.name,
            url: data.author.url,
            icon_url: data.author.icon_url
        } : null;
        this.fields = data.fields ? data.fields.map(cloneObject) : [];
    }

    /**
     * Adds a Embed Field.
     * 
     * @param {String} name The embed field name
     * @param {String} value The value of the embed
     * @param {Boolean} [inline=true] The inline of the embed. (Default is true)
     * @returns {EmbedBuilder}
     */
    addField(name, value, inline = true) {
        if (this.fields.length >= 25) throw new SyntaxError('[EmbedBuilder#addField]: Embed fields must be lower then 25.');
        name = resolveString(name);
        if (!String(name)) throw new SyntaxError('[EmbedBuilder#addField]: \'name\' must be a string.');
        value = resolveString(value);
        if (!String(value)) throw new SyntaxError("[EmbedBuilder#addField]: 'value' must be a string.");
        this.fields.push({ name, value, inline });
        return this;
    }

    /**
     * Sets an author to the embed.
     * 
     * @param {String} name The name of the author.
     * @param {String} url The url of the author.
     * @param {String} iconURL The icon url of the author.
     * @returns {EmbedBuilder}
     */
    setAuthor(name, iconURL, url) {
        this.author = {
            name: resolveString(name),
            iconURL,
            url
        };
        return this;
    }

    /**
     * Sets the color.
     * 
     * @param {?Number} color The color.
     */
    setColor(color) {
        this.color = resolveColor(color);
        return this;
    }

    /**
     * Sets an description.
     * 
     * @param {String} desc The description.
     */
    setDescription(desc) {
        desc = resolveString(desc);
        this.description = desc;
        return this;
    }

    /**
     * Sets an url.
     * 
     * @param {String} url The url
     */
    setURL(url) {
        this.url = url;
        return this;
    }

    /**
     * Sets an footer.
     * 
     * @param {String} text The text to the footer
     * @param {String} iconURL the icon.
     */
    setFooter(text, iconURL) {
        this.footer = {
            text: resolveString(text),
            iconURL
        };
        return this;
    }

    /**
     * Sets a timestamp
     * 
     * @param {Date} [timestamp=current date] The date.
     */
    setTimestamp(timestamp = new Date()) {
        this.timestamp = timestamp.getTime();
        return this;
    }

    /**
     * Sets the thumbnail.
     * 
     * @param {String} url The url.
     */
    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }

    /**
     * Sets an image.
     * 
     * @param {String} url the url
     */
    setImage(url) {
        this.image = { url };
        return this;
    }

    /**
     * Builds the embed
     * 
     * @returns {Object} The embed object.
     */
    build() {
        return {
            title: this.title,
            description: this.description,
            author: this.author ? {
                name: this.author.name,
                url: this.author.url,
                icon_url: this.author.iconURL
            } : null,
            timestamp: this.timestamp ? new Date(this.timestamp) : null,
            type: 'rich',
            color: this.color,
            fields: this.fields,
            url: this.url,
            thumbnail: this.thumbnail,
            footer: this.footer ? {
                text: this.footer.text,
                icon_url: this.footer.iconURL
            } : null,
            image: this.image
        };
    }
}

module.exports = EmbedBuilder;
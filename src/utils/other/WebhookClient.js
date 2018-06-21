module.exports = class WebhookService {
    constructor(client, options = {}) {
        this.url = options.url;
        this.client = client;
    }

    send(content) {
        if (content instanceof Object) {
            this.client.snek.post(this.url)
                .send({
                    embeds: [
                        content
                    ]
                })
                .end();
        } else {
            this.client.snek.post(this.url)
                .send({ content })
                .end();
        }
    }
};
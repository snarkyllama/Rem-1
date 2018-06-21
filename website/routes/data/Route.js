module.exports = class Route {
    constructor(client) {
        if (!client) throw new Error('Client hasn\'t been specified in the constructor.');
        if (this.constructor.name === Route) throw new Error("You can't extend an abstrack class!");

        this.client = client;
    }
};
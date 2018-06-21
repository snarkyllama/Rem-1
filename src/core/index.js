module.exports = {
    // Root
    RemClient: require('./Client'),

    // Schemas
    GuildSchema: require('./schemas/Guild'),
    UserSchema: require('./schemas/User'),

    // Structures
    Command: require('./structures/Command'),
    Context: require('./structures/Context'),
    VoiceConnection: require('./structures/VoiceConnection')
};
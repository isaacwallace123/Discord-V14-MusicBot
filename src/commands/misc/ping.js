const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    
    execute: async ({ client, interaction }) => {
        const clientLatency = client.ws.ping.toFixed(0);

        return interaction.reply(`:ping_pong: Pong! ${clientLatency}ms`);
    },
};
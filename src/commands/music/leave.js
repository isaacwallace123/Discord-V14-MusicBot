const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const { useQueue } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Force bot to leave the voice call'),
    
    execute: async ({ client, interaction }) => {
        const queue = useQueue(interaction.guildId);

        if (!queue) {
            const embed = new EmbedBuilder()
                .setColor(0xFF6161)
                .setTitle("Not playing")
                .setDescription(`I am currently not playing any tracks`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply();

        queue.delete();

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Disconnected!")
            .setDescription(`Goodbye and have fun!`)

        return interaction.editReply({ embeds: [embed] });
    },
};
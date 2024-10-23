const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const { useQueue } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Force bot to leave the voice call'),
    
    execute: async ({ client, interaction }) => {
        const queue = useQueue(interaction.guildId);
        
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Disconnected!")
            .setDescription(`Goodbye and have fun!`)

        if (!queue) return interaction.editReply({ embeds: [embed], ephemeral: true });

        queue.delete();

        return interaction.editReply({ embeds: [embed] });
    },
};
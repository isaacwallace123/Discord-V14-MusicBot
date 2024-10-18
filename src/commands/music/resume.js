const { SlashCommandBuilder, EmbedBuilder, time } = require('@discordjs/builders');

const { useTimeline } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the current song'),
    
    execute: async ({ client, interaction }) => {
        const timeline = useTimeline(interaction.guildId);

        if (!timeline?.track) {
            const embed = new EmbedBuilder()
                .setColor(0xFF6161)
                .setTitle("Not playing")
                .setDescription(`I am currently not playing any tracks`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!timeline.paused) {
            const embed = new EmbedBuilder()
                .setColor(0xFF6161)
                .setTitle("Error")
                .setDescription(`The track is not paused`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply();

        timeline.resume();

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Resumed")
            .setDescription(`I have successfully resumed the track.`)

        return interaction.editReply({ embeds: [embed] });
    },
};
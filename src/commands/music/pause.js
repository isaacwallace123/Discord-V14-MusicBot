const { SlashCommandBuilder, EmbedBuilder, time } = require('@discordjs/builders');

const { useTimeline } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause & unpause the current song'),
    
    execute: async ({ client, interaction }) => {
        const timeline = useTimeline(interaction.guildId);

        if (!timeline?.track) {
            const embed = new EmbedBuilder()
                .setColor(0xFF6161)
                .setTitle("Not playing")
                .setDescription(`I am currently not playing any tracks`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply();

        const WasPaused = timeline.paused

        if (WasPaused) {
            timeline.resume();
        } else {
            timeline.pause();
        }

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${WasPaused ? "Resumed" : "Paused"}`)
            .setDescription(`I have successfully ${WasPaused ? "resumed" : "paused"} the track.`)

        return interaction.editReply({ embeds: [embed] });
    },
};
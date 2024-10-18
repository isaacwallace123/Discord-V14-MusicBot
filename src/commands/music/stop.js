const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const { useQueue } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music player'),
    
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

        queue.node.stop();

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Track stopped!")
            .setDescription(`I have successfully stopped the track.`)

        return interaction.editReply({ embeds: [embed] });
    },
};
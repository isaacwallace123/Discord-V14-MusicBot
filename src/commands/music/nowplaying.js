const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const { usePlayer, useTimeline } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('View the currently playing song'),
    
    execute: async ({ client, interaction }) => {
        const node = usePlayer(interaction.guildId);
        const timeline = useTimeline(interaction.guildId);

        if (!timeline?.track) {
            const embed = new EmbedBuilder()
                .setColor(0xFF6161)
                .setTitle("Not playing")
                .setDescription(`I am currently not playing any tracks`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply();

        const { track, timestamp } = timeline;

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Now Playing")
            .setDescription(`**[${track.title} - ${track.author}](${track.url})**`)
            .setFields([{ name: 'Progress', value: node.createProgressBar() }])
            .setThumbnail(track.thumbnail)
            .setFooter({ text: `Requested by ${track.requestedBy?.tag} • ${timestamp.progress}%`, iconURL: track.requestedBy?.displayAvatarURL() });

        return interaction.editReply({ embeds: [embed] });
    },
};
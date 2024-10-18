const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const { useQueue, usePlayer, useTimeline } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Displays the current queue of songs.'),
    
    execute: async ({ client, interaction }) => {
        const queue = useQueue(interaction.guildId);
        const timeline = useTimeline(interaction.guildId);

        if (!queue?.isPlaying()) {
            const embed = new EmbedBuilder()
                .setColor(0xFF6161)
                .setTitle('Not Playing')
                .setDescription('I am currently not playing any tracks');
            
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply();

        const { track } = timeline;

        let FinalDescription = `**Now: [${track.title} - ${track.author}](${track.url}) - ${track.duration}**\n\n`

        const trackString = queue.tracks.toArray().slice(0,10).map((track, placement) => {
            return `${placement + 1}) [${track.title} - ${track.author}](${track.url}) - ${track.duration}\n`
        }).join('\n');

        FinalDescription += trackString;

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Current Queue')
            .setDescription(`${FinalDescription}`)
            .setThumbnail(track.thumbnail);

        return interaction.editReply({ embeds: [embed] });
    },
};
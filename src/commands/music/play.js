const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song.')
        .addStringOption(option => 
            option.setName('query')
                .setDescription('The track or playlist to play')
                .setRequired(true)),
    
    execute: async ({ client, interaction }) => {
        let query = interaction.options.getString("query", true)

        const channel = interaction.member.voice.channel;

        if (!channel) return interaction.reply("You need to be in a Voice Channel to play a song.");

        const player = useMainPlayer();

        await interaction.deferReply();

        const result = await player.search(query, {
            requestedBy: interaction.user,
        });

        if (!result.hasTracks()) {
            const embed = new EmbedBuilder()
                .setColor(0xFF6161)
                .setTitle("No results found")
                .setDescription(`No results found for \`${query}\``);
            
                return interaction.editReply({ embeds: [embed], ephemeral: true });

        }

        const { track, searchResult } = await player.play(channel, result, {
            nodeOptions: {
                metadata: interaction,
                noEmitInsert: true,
                leaveOnStop: false,
                leaveOnEmpty: true,
                leaveOnEmptyCooldown: 60000,
                leaveOnEnd: true,
                leaveOnEndCooldown: 60000,
                pauseOnEmpty: true,
                preferBridgedMetadata: true,
                disableBiquad: true,
            },
            requestedBy: interaction.user,
            connectionOptions: {
                deaf: true,
            }
        })

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
//            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setTitle(`${searchResult.hasPlaylist() ? 'Playlist' : 'Track'} queued!`)
            .setDescription(`${searchResult.hasPlaylist() ? `${searchResult.playlist.title}` : `**[${track.title} - ${track.author}](${track.url})**`}`)
            .setThumbnail(track.thumbnail)
            .setFooter({ text: `Duration: ${track.duration}`});

        return interaction.editReply({ embeds: [embed] });
    },
};
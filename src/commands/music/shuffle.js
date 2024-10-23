const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const { useMainPlayer } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the current playlist'),
    
    execute: async ({ client, interaction }) => {
        const channel = interaction.member.voice.channel;

        if (!channel) return interaction.reply({ content: "You need to be in a Voice Channel to shuffle the queue.", ephemeral: true });

        const player = useMainPlayer();
        const queue = player.nodes.get(interaction.guildId);

        if (!queue || !queue.getSize() === 0) return interaction.reply({ content: "There is no queue to shuffle.", ephemeral: true });

        await interaction.deferReply();

        queue.tracks.shuffle();

        const shuffleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Queue shuffled!")
            .setDescription("The current queue has been shuffled.")
            .setFooter({ text: `Requested by ${interaction.user.username}` });

        return interaction.editReply({ embeds: [shuffleEmbed] });
    },
};
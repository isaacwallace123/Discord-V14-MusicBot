const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const { useMainPlayer, useQueue } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip to the next track.'),
    
    execute: async ({ client, interaction }) => {
        const queue = useQueue(interaction.guildId);

        if (!queue?.isPlaying()) {
            const embed = new EmbedBuilder()
                .setColor(0xFF6161)
                .setTitle('Not Playing')
                .setDescription('I am currently not playing any tracks');
            
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply();

        queue.node.skip();

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
//            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setTitle('Track skipped!')
            .setDescription('I have successfully skipped to the next track.')

        return interaction.editReply({ embeds: [embed] });
    },
};
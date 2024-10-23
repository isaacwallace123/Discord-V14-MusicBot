const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const { useHistory } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('previous')
        .setDescription('Plays the previously played song'),
    
    execute: async ({ client, interaction }) => {
        const history = useHistory(interaction.guildId);

        if (!history || history.isEmpty()) {
            const embed = new EmbedBuilder()
                .setColor(0xFF6161)
                .setTitle('No previous')
                .setDescription('There are no previously played songs');
            
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply();

        await history.back();

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Track skipped!')
            .setDescription('I have successfully skipped to the previous track.')

        return interaction.editReply({ embeds: [embed] });
    },
};
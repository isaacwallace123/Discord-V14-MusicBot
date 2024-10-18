const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const { useQueue } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vocalboost')
        .setDescription('Toggle vocal boost filter')
        .addBooleanOption(option => 
            option.setName('state')
                .setDescription('Whether to enable or disable the filter')
                .setRequired(true)),
    
    execute: async ({ client, interaction }) => {
        const queue = useQueue(interaction.guildId);
        const state = interaction.options.getBoolean('state', true);

        if (!queue?.isPlaying()) {
            const embed = new EmbedBuilder()
                .setColor(0xFF6161)
                .setTitle("Not playing")
                .setDescription(`I am currently not playing any tracks`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!queue.filters.equalizer) {
            const embed = new EmbedBuilder()
                .setColor(0xFF6161)
                .setTitle("Error")
                .setDescription(`Equaliser is not enabled for this track`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply();

        if (state) {
            queue.filters.equalizer.setEQ([
                { band: 0, gain: -0.2 },
                { band: 1, gain: -0.2 },
                { band: 2, gain: 0.2 },
                { band: 3, gain: 0.15 },
                { band: 4, gain: 0.1 },
                { band: 5, gain: -0.1 },
              ]);
        } else {
            queue.filters.equalizer.setEQ(queue.filters.equalizerPresets.Flat);
        }

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Success!")
            .setDescription(`I have successfully ${state ? 'enabled' : 'disabled'} the vocal boost filter`);

        return interaction.editReply({ embeds: [embed] });
    },
};
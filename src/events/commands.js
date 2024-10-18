const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	
	async execute(client, interaction) {
		if(!interaction.isCommand() || !interaction.inCachedGuild()) return;

        const command = client.commands.get(interaction.commandName);

        if(!command) return;

        try {
            await command.execute({client, interaction});
        } catch(error) {
            console.error(error);
            await interaction.reply({content: "There was an error executing this command"});
        }
	},
};

const { Events } = require('discord.js');
const { Routes } = require('discord-api-types/v9');

module.exports = {
	name: Events.GuildCreate,
	once: false,

	execute(client, guild) {
        client.rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guild.id), {body: client.arraycommands})
            .then(() => console.log('Successfully updated commands for guild ' + guild.id))
            .catch(console.error);
		
	},
};

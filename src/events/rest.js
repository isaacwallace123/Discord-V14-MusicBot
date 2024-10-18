const { Events } = require('discord.js');
const { Routes } = require('discord-api-types/v9');

module.exports = {
	name: Events.ClientReady,
	once: true,

	execute(client) {
		const guilds = client.guilds.cache.map(guild => guild.id);

		for (const guildId of guilds) {
			client.rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {body: client.arraycommands})
				.then(() => console.log('Successfully updated commands for guild ' + guildId))
				.catch(console.error);
		}
	},
};

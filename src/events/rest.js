const { Events } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = {
	name: Events.ClientReady,
	once: true,

	execute(client) {
		const guilds = client.guilds.cache.map(guild => guild.id);

		const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

		for (const guildId of guilds) {
			rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {body: client.arraycommands})
				.then(() => console.log('Successfully updated commands for guild ' + guildId))
				.catch(console.error);
		}
	},
};

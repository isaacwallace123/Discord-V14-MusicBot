require('dotenv').config();

const { Client, IntentsBitField, Collection } = require('discord.js');

const fs = require('fs');
const path = require('path');

// Create the discord client

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildVoiceStates]
});

// Get all files within a directory

const getFilesRecursively = (dir) => {
	let results = [];

    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results = results.concat(getFilesRecursively(filePath));
        } else if (file.endsWith('.js')) {
            results.push(filePath);
        }
    });

    return results;
}

// Instantiate Commands

const commands = [];
client.commands = new Collection();

for (const file of getFilesRecursively(path.join(__dirname, "commands"))) {
    const command = require(file);

    client.commands.set(command.data.name, command);

    commands.push(command.data.toJSON());
}

client.arraycommands = commands;

// Connect events

for (const file of getFilesRecursively(path.join(__dirname, 'events'))) {
    const event = require(file);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// Start Client

client.login(process.env.TOKEN);

process.on('SIGTERM', () => {
    process.exit(0);
});
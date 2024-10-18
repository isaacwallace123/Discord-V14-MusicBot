const { Events, EmbedBuilder } = require('discord.js');
const { Player, GuildQueueEvent } = require("discord-player");
const { YoutubeiExtractor } = require("discord-player-youtubei");
const { SpotifyExtractor, SoundCloudExtractor } = require("@discord-player/extractor")

module.exports = {
	name: Events.ClientReady,
	once: true,

	async execute(client) {
		const player = new Player(client, {
            ytdlOptions: {
                quality: "highestaudio",
                highWaterMark: 1 << 25
            }
        })
        
        await player.extractors.register(YoutubeiExtractor, {});
        await player.extractors.register(SpotifyExtractor, {});
        await player.extractors.register(SoundCloudExtractor, {});

        player.events.on(GuildQueueEvent.playerStart, (queue, track) => {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: queue.metadata.user.username, iconURL: queue.metadata.user.displayAvatarURL() })
                .setTitle("Playing Track")
                .setDescription(`**[${track.title} - ${track.author}](${track.url})**`)
                .setThumbnail(track.thumbnail)
                .setFooter({ text: `Duration: ${track.duration}`});
            
            queue.metadata.channel.send({ embeds: [embed] })
        });
	},
};

const chalk = require('chalk');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "loop",
        aliases: ["repeat"],
        description: "loop the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<current, all>"
    },
    run: async (client, message, args) => {
		const msg = await message.channel.send('Loading please wait...');

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		if (!args[0] || args[0].toLowerCase() == 'current') {
			if (player.trackRepeat === false) {
				player.setTrackRepeat(true);

				const looped = new EmbedBuilder()
					.setDescription(`\`🔁\` | **Song is loop:** \`<:cx_tick:1094532084552450058>\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [looped] });
						console.log(chalk.magenta(`[COMMAND] Loop used by ${message.author.tag} from ${message.guild.name}`));
			}
			else {
				player.setTrackRepeat(false);

				const unlooped = new EmbedBuilder()
					.setDescription(`\`🔁\` | **Song is unloop:** \`<:cx_tick:1094532084552450058>\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [unlooped] });
						console.log(chalk.magenta(`[COMMAND] Unloop used by ${message.author.tag} from ${message.guild.name}`));
			}
		}
		else if (args[0] == 'all') {
			if (player.queueRepeat === true) {
				player.setQueueRepeat(false);

				const unloopall = new EmbedBuilder()
					.setDescription(`\`🔁\` | **Song is unloop:** \`<:cx_tick:1094532084552450058>\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [unloopall] });
						console.log(chalk.magenta(`[COMMAND] Unloopall used by ${message.author.tag} from ${message.guild.name}`));
			}
			else {
				player.setQueueRepeat(true);

				const loopall = new EmbedBuilder()
					.setDescription(`\`🔁\` | **Song is loop:** \`<:cx_tick:1094532084552450058>\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [loopall] });
						console.log(chalk.magenta(`[COMMAND] Loopall used by ${message.author.tag} from ${message.guild.name}`));
			}
		}
	}
};

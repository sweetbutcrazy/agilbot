const { EmbedBuilder } = require("discord.js");
const { PREFIX } = require("../../config.json");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const chalk = require("chalk");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "(command)",
        category: "utilities",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        console.log(chalk.magenta(`[COMMAND] Help used by ${message.author.tag} from ${message.guild.name}`));
        const embed = new EmbedBuilder()
            .setColor('#000001')
            .setAuthor({ name: `${message.guild.me.displayName} Help Command!`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`The bot prefix is: **${PREFIX}**`)
            embed.setFooter({ text: `© ${message.guild.me.displayName} | Dev By KINGS`, iconURL: client.user.displayAvatarURL({ dynamic: true })});

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send({ embeds: [embed] })
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send({ embeds: [embed.setTitle("Invalid Command.").setDescription(`Do \`${PREFIX}help\` for the list of the commands.`)] })
            command = command.config

            embed.setDescription(stripIndents`The client's prefix is: \`${PREFIX}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "Official Bot By KINGS"}
            **Usage:** ${command.usage ? `\`${PREFIX}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send({ embeds: [embed] })
        }
    }
}

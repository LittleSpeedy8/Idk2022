const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Client, ActivityType } = require("discord.js")
const Database = require("../../Schemas/infractions")
const ms = require("ms") 

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("botstatus")
        .setDescription("Restrict a member's ability to communicate.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(true)
            .addStringOption(options => options
                .setName("status")
                .setDescription("Provide a status for the bot.")
                .setRequired(true))
                        .addStringOption(ay => ay
                            .setName("activitytype")
                            .setDescription("Set the ActivityType for the bot.")
                            .setRequired(true)
                            .addChoices(
                                { name: 'Competing', value: 'competing' },
                                { name: 'Custom', value: 'custom' },
                                { name: 'Listening', value: 'listening' },
                                { name: 'Playing', value: 'playing' },
                                { name: 'Streaming', value: 'streaming' },
                                { name: 'Watching', value: 'watching' }))
                                .addStringOption(options => options
                                    .setName("url")
                                    .setDescription("Provide a url(This only works for streaming)")
                                    .setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param { Client } client
     */
  async execute(interaction, client) {
        const { options, guild, member } = interaction;
     


        const status = options.getString("status")
        const activityType = options.getString("activitytype")
        const URL = options.getString("url")


          switch (activityType) {
            case "competing": {
                client.user.setActivity(`${status}`, {
                    type: ActivityType.Competing,
                  });
                return interaction.reply({content: `Working!`})
            }
            break;

            case "custom": {
                client.user.setActivity(`${status}`, {
                    type: ActivityType.Custom,
                  });
                return interaction.reply({content: `Working!`})
            }
            break;

            case "listening": {
                client.user.setActivity(`${status}`, {
                    type: ActivityType.Listening,
                  });
                return interaction.reply({content: `Working!`})
            }
            break;

            case "playing": {
                client.user.setActivity(`${status}`, {
                    type: ActivityType.Playing,
                  });
                return interaction.reply({content: `Working!`})
            }
            break;

            case "streaming": {
                client.user.setActivity(`${status}`, {
                    type: ActivityType.Streaming,
                    url: `${URL}`,
                  });
                return interaction.reply({content: `Working!`})
            }
            break;

            case "watching": {
                client.user.setActivity(`${status}`, {
                    type: ActivityType.Watching,
                  });
                return interaction.reply({content: `Working!`})
            }
            break;

        }

       

      
    }
}
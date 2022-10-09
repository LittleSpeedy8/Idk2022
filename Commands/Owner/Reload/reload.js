const {  SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads the commands/events files")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
    .setName("events")
    .setDescription("Reloads events files."))
    .addSubcommand((options) => options
    .setName("commands")
    .setDescription("Reloads commands files.")),
    /**
     * @param {ChatInputCommandInteraction} interaction
     *  @param {Client} client
     */
}
const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Displays the ping"),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction){
        
        const ErrorEmbed = new EmbedBuilder()
        .setTitle("ERROR")
        .setColor("Red")

       
            
        
        try{
            interaction.reply({content: "Pong!", ephemeral: true})
        } catch (error){
            interaction.reply({embeds: [ErrorEmbed.setDescription(`${error}`).setFooter({text: "© Mr. Speedy Studios | All Errors Are Logged."})]})
        }
    }
}
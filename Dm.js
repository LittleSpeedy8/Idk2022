const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const Database = require("../../Schemas/infractions")
const ms = require("ms") 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Dm a user in a server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false)
        .addUserOption(options => options
            .setName("user")
            .setDescription("Select the user to dm.")
            .setRequired(true))
                .addStringOption(options => options
                    .setName("message")
                    .setDescription("Provide a message for the dm.")
                    .setMaxLength(512)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
  async execute(interaction) {
        const { options, guild, member } = interaction;

        const user = options.getMember("user");
        const message = options.getString("message") || "None specified"

        const errorsArray = [];

        const errorsEmbed = new EmbedBuilder()
        .setAuthor({name: "Could not dm member due to"})
        .setColor("Red")

        if(!user) return interaction.reply({
            embeds: [errorsEmbed.setDescription("Member has most likely left the guild")],
            ephemeral: true
        })

        if(!ms(duration) || ms(duration) > ms("28d"))
        errorsArray.push("Time provided is invalid or over the 28d limit.");

        if(!target.manageable || !target.moderatable)
        errorsArray.push("Selected target is not moderatable by this bot.")

        if(member.roles.highest.position < target.roles.highest.position)
        errorsArray.push("Selected member has a higher role position than you.")



        if(errorsArray.length)
        return interaction.reply({
            embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
            ephemeral: true
        });

        target.timeout(ms(duration), reason).catch((error) => {
            interaction.reply({
                embeds: [errorsEmbed.setDescription("Could not timeout user due to an uncommon error.")]
            })
            return console.log("Error occured in Timeout.js", error)
        });

       const newInfractionsObject = {
        IssuerID: member.id,
        IssuerTag: member.user.tag,
        Reason: reason,
        Date: Date.now()
       }

       let userData = await Database.findOne({Guild: guild.id, User: target.id})
       if(!userData) userData = await Database.create({Guild: guild.id, User: target.id, Infractions: [newInfractionsObject]})
       else userData.Infractions.push(newInfractionsObject) && await userData.save()

       const successEmbed = new EmbedBuilder()
       .setAuthor({name: "Timeout issues", iconURL: guild.iconURL()})
       .setColor("Gold")
       .setDescription([
        `${target} was issued a timeout for **${ms(ms(duration), {long: true})}** by ${member}`,
        `bringing their infractions total to **${userData.Infractions.length} points**`,
        `\nReason: ${reason}`
       ].join("\n"))

       const Dm = new EmbedBuilder()
       .setAuthor({name: "Timeout issues", iconURL: guild.iconURL()})
       .setColor("Gold")
       .setFooter({text: `© Mr. Speedy Studios | Timeout is in ${guild}`})
       .setDescription([
        `Your in a timeout for **${ms(ms(duration), {long: true})}** by ${member}`,
        `your infractions total is **${userData.Infractions.length} points**`,
        `\nReason: ${reason}`
       ].join("\n"))

       try{
        target.send({embeds: [Dm]})
       } catch (error) {
        console.log("Could not dm user.")
       }

       return interaction.reply({embeds: [successEmbed]})
    }
}
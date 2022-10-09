const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember } = Partials

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember]
})

const { loadEvents } = require("./Handlers/eventHandler")
const { loadCommands } = require("./Handlers/commandHandler")


client.config = require("./config.json");
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();

const { Token } = client.config


const { connect } = require("mongoose")
connect(client.config.DatabaseURL, {
}).then(() => console.log("Database is successfully connected! 🥳"))

loadEvents(client)

client.login(Token)
module.exports = client

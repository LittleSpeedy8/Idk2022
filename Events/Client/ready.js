const { loadCommands } = require("../../Handlers/commandHandler")
const { Dashboard } = require("../../Dashboard/server")
module.exports = {
    name: "ready",
    once: true,
    execute(client)  {
        console.log(`READY`)

        loadCommands(client)
        Dashboard(client)
      
    }
}
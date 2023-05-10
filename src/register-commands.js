require("dotenv").config();

const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
const commands = [
  {
    name: "hey",
    description: "Replies with hello!",
  },
  {
    name: "ping",
    description: "Pong!",
  },
];

(async () => {
  try {
    console.log("registering slash commands");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("slash commands were registered");
  } catch (err) {
    console.log(`There was an error: ${err}`);
  }
})();

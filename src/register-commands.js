require("dotenv").config();

const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

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
  {
    name: "add",
    description: "Adds two numbers.",
    options: [
      {
        name: "first-number",
        description: "The first number.",
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: "one",
            value: 1,
          },
          {
            name: "two",
            value: 2,
          },
          {
            name: "three",
            value: 3,
          },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "The second number.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "server",
    description: "Provides information about Warlords Kindom server.",
  },
  {
    name: "member",
    description: "Provides information about Warlord user.",
  },
  {
    name: "rules",
    description: "Provides rules about the server",
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

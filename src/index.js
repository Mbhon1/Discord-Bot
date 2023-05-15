require("dotenv").config();

const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
  InteractionResponse,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: "PUBG MOBILE",
    type: ActivityType.Watching,
    url: "https://youtu.be/EfvaKKAQbiw",
  },
  {
    name: "PUBG MOBILE",
    type: ActivityType.Streaming,
    url: "https://youtu.be/zR1hm4d-YTk",
  },
  {
    name: "Lofi Girl",
    type: ActivityType.Listening,
    url: "https://open.spotify.com/playlist/1YIe34rcmLjCYpY9wJoM2p?si=a7087610c4304f4c",
  },
];

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online`);

  setInterval(() => {
    const random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 60000);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "hello") {
    message.reply(`Ahoy Warlord!`);
  }

  if (message.content === "rules") {
    const rules = new EmbedBuilder()
      .setTitle("Kingdom Rules.")
      .setDescription("These are the rules of the server.")
      .setColor("Random");

    message.reply({ embeds: [rules] });
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction.commandName);

  if (interaction.commandName === "hey") {
    interaction.reply(`Hey there Warlord ${interaction.user.username}!!!`);
  }

  if (interaction.commandName === "ping") {
    interaction.reply("Pong!");
  }

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    interaction.reply(`The sum is ${num1 + num2}.`);
  }

  if (interaction.commandName === "server") {
    interaction.reply(
      `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} Warlords.`
    );
  }

  if (interaction.commandName === "member") {
    interaction.reply(
      `This command was run by ${interaction.user.username}, who joined ${interaction.member.joinedAt}.`
    );
  }

  if (interaction.commandName === "rules") {
    const rules = new EmbedBuilder()
      .setTitle("Kingdom Rules.")
      .setDescription("These are the rules of the server.")
      .setColor("Random")
      .addFields({ name: "Regular Field title", value: "Some text here" })
      .setThumbnail("https://i.imgur.com/AfFp7pu.png")
      .setImage("https://i.imgur.com/AfFp7pu.png")
      .setTimestamp()
      .setFooter({
        text: "Maintained by Gypsy. All rights reserved.",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
    interaction.reply({ embeds: [rules] });
  }
});

client.login(process.env.TOKEN);

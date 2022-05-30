// Require the necessary discord.js classes
const {
  Client,
  Intents,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "wesselisgay") {
    await interaction.reply("Klopt.");
  } else if (commandName === "wesselisnotgay") {
    await interaction.reply("Klopt niet.");
  } else if (commandName === "wesselvotekick") {
    const embed = new MessageEmbed()
      .setColor("ORANGE")
      .setDescription("Vote hier om Wessel te kicken.");

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("primary")
        .setLabel("Vote kick")
        .setStyle("PRIMARY")
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  }
});

// Login to Discord with your client's token
client.login(token); 

require("./deploy-commands");

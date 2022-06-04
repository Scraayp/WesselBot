// Require the necessary discord.js classes
const {
  Client,
  Intents,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  ButtonInteraction,
} = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

let vote = 0;

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId == "votekick") {
      vote++;
    }
  }

  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "wesselisgay") {
    await interaction.reply("Klopt. Wessel is gay.");
  } else if (commandName === "wesselisnotgay") {
    await interaction.reply("Klopt niet. Wessel is nog steeds gay.");
  } else if (commandName === "wesselvotekick") {
    const embed = new MessageEmbed()
      .setColor("ORANGE")
      .setDescription("Vote hier om Wessel te kicken.");

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("votekick")
        .setLabel("Vote kick")
        .setStyle("PRIMARY")
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  } else if (commandName === "wesselvoicemute") {
    const embed = new MessageEmbed()
      .setColor("ORANGE")
      .setDescription("Wessel wordt nu gemute.");
    (await interaction.guild.members.fetch("676749014259073043")).voice.setMute(
      true,
      "Command gerunt."
    );
  }
});

// Login to Discord with your client's token
client.login(token);

require("./deploy-commands");

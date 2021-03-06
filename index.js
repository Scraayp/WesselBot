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
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "tosti") {
    await interaction.reply(
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/voor-altijd-favoriet-de-tosti-img900-1542990445.jpg?resize=980:*"
    );
  }

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

    const filter = (i) => i.customId === "votekick";
    const collector = interaction.channel.createMessageComponentCollector({
      filter: filter,
      time: 15000000,
    });
    collector.on("collect", async (i) => {
      if (i.customId == "votekick") {
        vote++;
        if (vote > 2) {
          (await interaction.guild.members.fetch("676749014259073043")).kick(
            "Votekick"
          );
          await interaction.editReply({
            content: "**Wessel is gekicked!**",
            components: [],
            embeds: [],
          });
          vote = 0;
          return;
        }
        i.update({ embeds: [], content: `**${vote}**/3 votes tot nu toe.` });
      }
    });

    collector.on("end", (collected) =>
      interaction.editReply({
        content: "Vote kick party gestopt!",
        embeds: [],
        components: [],
      })
    );
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

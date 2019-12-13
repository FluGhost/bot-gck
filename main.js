const { Discord, MessageEmbed, Client } = require("discord.js");
const client = new Client();
const json = require("./file.json");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activity: { name: `type ${json.prefix}help for help.` },
    status: `online`
  });
});

client.on("message", msg => {
  /* ping */
  const pingEmbed = new MessageEmbed()
    .setTitle("Pong !")
    .setDescription(`Took : ${msg.createdTimestamp - Date.now()} ms.`)
    .setColor(json.colorEmbed)
    .setFooter(
      "Bot created by : FluGhost#7007",
      "https://image.noelshack.com/fichiers/2019/50/5/1576262895-flughostlogo.png"
    );

  if (msg.content === json.prefix + "ping") {
    msg.channel.send(pingEmbed);
  }
  /* help */
  const helpEmbed = new MessageEmbed()
    .setTitle("Hey ! This is help for you !")
    .setDescription("To use a command, please use the prefix + the command.")
    .addField("Exemple :", `${json.prefix}help`)
    .addField("__**Prefix**__ :", `${json.prefix}`)
    .addField("\u200b", "**Commands :**", false)
    .addField(`help`, `This is the help message.`)
    .addField(`ping`, `This will give you the ping of the bot.`)
    .setColor("#436d44")
    .setFooter(
      "Bot created by : FluGhost#7007",
      "https://image.noelshack.com/fichiers/2019/50/5/1576262895-flughostlogo.png"
    );
  if (msg.content === json.prefix + "help") {
    msg.channel.send(helpEmbed);
  }
});

client.login(json.token);

const { Discord, MessageEmbed, Client } = require("discord.js");
const client = new Client();
const json = require("./file.json");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activity: { name: `prefix : c#` },
    status: `online`
  });
});

client.on("message", msg => {
  /* ping */
  const pingEmbed = new MessageEmbed()
    .setTitle("Pong !")
    .setDescription(`Took : ${msg.createdTimestamp - Date.now()} ms.`)
    .setColor("#436d44")
    .setFooter(
      "Bot created by : FluGhost#7007",
      "https://image.noelshack.com/fichiers/2019/50/5/1576262895-flughostlogo.png"
    );

  if (msg.content === "c#ping") {
    msg.channel.send(pingEmbed);
  }
});

client.login(json.token);

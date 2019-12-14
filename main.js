const { Discord, MessageEmbed, Client } = require("discord.js");
const client = new Client();
const json = require("./file.json");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // joue à ...
  client.user.setPresence({
    activity: { name: `type ${json.prefix}help for help.` },
    status: `online`
  });
});

client.on("message", msg => {
  if (msg.author.bot) return;
  const args = msg.content.slice(json.prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  /* ping */

  if (args[0] === "ping") {
    const pingEmbed = new MessageEmbed()
      .setTitle("Pong !")
      .setDescription(`Took : ${Math.round(client.ping)} ms.`)
      .setColor(json.colorEmbed)
      .setFooter(
        "Bot created by : FluGhost#7007",
        "https://image.noelshack.com/fichiers/2019/50/5/1576262895-flughostlogo.png"
      );

    msg.channel.send(pingEmbed);
  }
  /* help */
  const helpEmbed = new MessageEmbed()
    .setTitle("Hey ! This is help for you !")
    .setDescription("To use a command, please use the prefix + the command.")
    .addField("Exemple :", `\`${json.prefix}help\` It's the prefix + \`help\`.`)
    .addField("__**Prefix**__ :", `${json.prefix}`)
    .addField("\u200b", "**Relase commands :**", false)
    .addField(
      `\`help\``,
      `This is the help message. And you are on this command.`
    )
    .addField(`\`ping\``, `This will give you the ping of the bot.`)
    .addField("\u200b", "**Alpha commands :**", false)
    .addField("This commands will be crash the bot or be nothing.")
    .addField(
      `\`avatar\``,
      `This will give you your avatar and you can download it.`
    )
    .addBlankField()
    .setColor(json.colorEmbed)
    .setFooter(
      "Bot created by : FluGhost#7007",
      "https://image.noelshack.com/fichiers/2019/50/5/1576262895-flughostlogo.png"
    );
  if (cmd === json.prefix + "help") {
    msg.channel.send(helpEmbed);
  }

  /* obtenir un utilisteur depuis une mention */
  function getUserFromMention(mention) {
    // The id is the first and only match found by the RegEx.
    const matches = mention.match(/^<@!?(\d+)>$/);

    // If supplied variable was not a mention, matches will be null instead of an array.
    if (!matches) return;

    // However the first element in the matches array will be the entire mention, not just the ID,
    // so use index 1.
    const id = matches[1];

    return client.users.get(id);
  }

  /* avatar */
  if (msg.content.startsWith(json.prefix)) {
    /* donnons à l'utilisateur son avatar */
    if (cmd === "avatar") {
      //Si c'est la commande avatar
      if (!args) {
        //Si il n'y a pas d'arguments on donne l'avatar de l'auteur du message
        const avatarMeEmbed = new MessageEmbed()
          .setTitle("This is your avatar !")
          .setURL(`${msg.author.displayAvatarURL()}`)
          .setDescription(
            "Click on the title text to open this image on your browser. So you can download it."
          )
          .setImage(msg.author.displayAvatarURL())
          .setColor(json.colorEmbed)
          .setFooter(
            "Bot created by : FluGhost#7007",
            "https://image.noelshack.com/fichiers/2019/50/5/1576262895-flughostlogo.png"
          );
        msg.channel.send(avatarMeEmbed);
      } else {
        //Si il y a des arguments
        const user = getUserFromMention(args[0]); //On récupère l'ID
        if (user) {
          //Si il y a un ID
          const avatarAutherEmbed = new MessageEmbed()
            .setTitle(`This is the avatar of ${user.tag} !`)
            .setURL(`${user.displayAvatarURL()}`)
            .setDescription(
              "Click on the title text to open this image on your browser. So you can download it."
            )
            .setImage(user.displayAvatarURL())
            .setColor(json.colorEmbed)
            .setFooter(
              "Bot created by : FluGhost#7007",
              "https://image.noelshack.com/fichiers/2019/50/5/1576262895-flughostlogo.png"
            );
          msg.channel.send(avatarAutherEmbed);
        } else {
          //Si il n'y a pas d'ID
          msg.reply("tu n'as pas donné une mention valable");
        }
      }
    }
  }
});

client.login(json.token);

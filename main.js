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
  const args = msg.content.split(/ + /g);
  const cmd = args.shift().toLowerCase();
  if (cmd.startsWith(json.prefix)) {
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
      .addField(
        "Exemple :",
        `\`${json.prefix}help\` It's the prefix + \`help\`.`
      )
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
      if (!mention) return;

      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);

        if (mention.startsWith(json.prefix)) {
          mention = mention.slice(1);
        }

        return client.users.get(mention);
      }
    }

    /* avatar */
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

    /* donnons à l'utilisateur son avatar */
    if (cmd === json.prefix + "avatar" && !args[0]) {
      msg.channel.send(avatarMeEmbed);
      /* donnons à l'utisateur l'avatar de son tag */
    } else if (
      cmd === "avatar" &&
      args[0].startsWith("<@") &&
      args[0].endsWith(">")
    ) {
      /* si l'utilisateur n'a pas mis de bon arguments alors le rappeler à l'ordre */
      const user = getUserFromMention(args[0]);
      if (!user) {
        msg.reply(
          `Sorry, is you want to have an avatar of a user, tag it. Else, don't write arguments after the command.\n If you have questions, this commands can help you : \`${json.prefix}help\``
        );
        console.log(`${msg.author.name} hasn't writted the true arguments.`);
      } else {
        const avatarAutherEmbed = new MessageEmbed()
          .setTitle(`This is the avatar of ${user} !`)
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
      }
    }
  }
});

client.login(json.token);

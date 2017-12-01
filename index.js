const Discord = require('discord.js')
const client = new Discord.Client()
const shelljs = require('shelljs');
const fs = require('fs');
const path = require('path');

const {
  stripIndents
} = require('common-tags');

//LOCAL REQUIREMENTS
const ess = require('./ess');
const commands = require('./commands.js');

client.on('ready', () => {
  console.log('King Dice is on ready');
  client.user.setGame(`=help | Guilds: ${client.guilds.array().length}`)
});

// Change playing status everytime the bot joins another server.
client.on('guildCreate', server => {
  console.log('King Dice has joined a new server!');
  client.user.setGame(`=help | Guilds: ${client.guilds.array().length}`).catch(e => console.log(e))
  server.owner.send(`Thank you for adding me to your server! Few things to know to get started. My prefix is =, and you can do **=help** to see the commands you can do!`).catch(e => console.log(e))

});
client.on('guildMemberAdd', member => {
  member.guild.systemChannel.send(`Warm welcome by King Dice! Good to see you, **${member.user.tag}**.`).catch(e => console.log(e))
});


// Create an event listener for messages
client.on('message', message => {
  var botData = fs.readFileSync(path.join(__dirname, '.') + '/bot.json');
  var bot = JSON.parse(botData);
  //Quit if it is a bot.
  if (message.author.bot == true) {
    return;
  }
  // Quit if it is from a DM
  if (!message.guild) {
    message.channel.send("DM isn't sufficient for my help. Reach in a server.")
    return;
  }


  //function send()
  function send(input) {
    try {
      message.channel.send(input).catch(e => message.channel.send("Oops, there was an error sending this message."))
    } catch (err) {
      message.channel.send(ess.errorHandle(err))
    }
  }

  // Auto help
  if (message.content.toUpperCase() == "<@379800674856206336> HELP") {
    let rich = new Discord.RichEmbed()
      .setTitle("Newbie guide to King Dice")
      .setDescription(`Hello, user, you look like you have almost to no idea what is going on. King Dice is a bot user. Which means it's **not** controlled by a human or viewed by another human. Any process with the bot will guarantee 99% anonymity from the creators of this bot. You can interact with this bot, and it has a lot of cool features. To interact with the bot, you first need to assign a command to the bot. Commands are made up with the "prefix", and the "command name". For this bot, the prefix would be the equal symbol: "=". Here are some basic commands.`)
      .setColor(0xd38cff)
      .setTimestamp(new Date())
      .addField("=help", "This command allows the bot to message you with a full command list. This is everything the bot can do.")
      .addField("=manual", "If you have problems with a single command, then you can use this command to learn everything about the command. (The manual page of the command)")
      .addField("Support", "If you are still stuck with King Dice, you can go to the support server: https://discord.gg/nVGgN93 by clicking on the link on the left side.")
    message.channel.send(rich)
    return;
  }

  //All Other Commands
  //Check before if it is a command
  let messplit = message.content.split("")
  if (messplit[0] !== bot.prefix) {
    return;
  }
  //maintenance check
  if (message.author.id !== bot.ownerid && bot.maintenance == true) {
    message.channel.send("The bot is currently on maintenance mode. Sorry for the inconvinence. You can check back later to see what commands it can do. It will be a great update! MY NAME IS MAC")
    return;
  }
  try {
    commands.allCommands(message, client, Discord)
    commands.adminCommands(message, client, Discord)
  } catch (e) {
    send(ess.errorHandle(e))
  }



  //Next is only for myself, Lewis Trident.
  if (message.author.id !== bot.ownerid) {
    return;
  }

  //Getting ownercommands
  try {
    commands.ownerCommands(message, client, Discord)
  } catch (e) {
    send(ess.errorHandle(e))
  }
  //Emergency in-line Commands
  if (message.content == "=r") {
    try {
      message.channel.send("**Restarting bot in 5 seconds** You cannot cancel this execution.").catch(e => console.log(e))
      setTimeout(function() {
        gitPull("Pulling from GitHub...");
      }, 1000);
      setTimeout(function() {
        exitnode();
      }, 4000);

      function gitPull(mes) {
        client.user.lastMessage.edit(mes).catch(e => console.log(e))
        execute('git pull')

        function execute(command) {
          let execution = shelljs.exec(command)
          send(stripIndents `\`\`\`xl
            ${execution.stdout}\`\`\``)
        }
      }

      function exitnode() {
        process.exit()
      }
    } catch (e) {
      send(ess.errorHandle(e))
    }
  }

  //END
});


client.login(require('./bot.json').token);

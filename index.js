const Discord = require('discord.js')
const client = new Discord.Client()
const shelljs = require('shelljs');

//LOCAL REQUIREMENTS
const ess = require('./ess');
const bot = require('./bot.json');
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
      message.channel.send(input).catch(e => message.channel.send("null"))
    } catch (err) {
      message.channel.send(ess.errorHandle(err))
    }
  }

  //All Other Commands
  //Check before if it is a command
  let messplit = message.content.split("")
  if (messplit[0] !== bot.prefix) {
    return;
  }

  //maintenece check
  if (bot.maintenance == true) {
    if (message.author.id !== bot.ownerid) {
      message.channel.send("The bot is currently on maintenance mode. Sorry for the inconvinence. You can check back later to see what commands it can do. It will be a great update!")
      return;
    }
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
          send(`\`\`\`xl
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


client.login(bot.token);

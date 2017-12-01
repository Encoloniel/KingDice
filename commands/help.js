const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');
const packagefile = require('../package.json')
const helpPanel = require('../helpPanel.json');
const bot = require('../bot.json')

module.exports = {
  purpose: function(message) {

    let helpmenu =

      (stripIndents `
      ${helpPanel.introduction}

      \`\`\`xl
      /* All Commands Anyone Can Use. */
      // Bot's features
      =${helpPanel.allCommands.features.join("\n=")}

      // Fun
      =${helpPanel.allCommands.fun.join("\n=")}

      // Tools
      =${helpPanel.allCommands.tools.join("\n=")}

      // Text tools
      =${helpPanel.allCommands.textTools.join("\n=")}
\`\`\`
\`\`\`xl

      /* Commands Moderators Can Use */
      // Basic controls
      =${helpPanel.moderatorCommands.basic.join("\n=")}

      // VERSION v${packagefile.version} release
      \`\`\`
      You can also use the --onserver tag to view the commands on the server. If you are having trouble with the bot and its commands,
      simply find our support server, or use the =manual command to find out the usage of a command. Thank you for using my bot.
      -Louis (aka Lewis, encoloniel) <@322158876449308683>
      `)

    try {
      if (message.content.includes('--onserver')) {
        message.channel.send(helpmenu)
      } else {
        message.author.send(helpmenu).catch(err => message.channel.send("You have DMs disabled. I cannot message you the help panel :("))
        message.channel.send(`Help command sent to your DMs, **${message.author.username}**`)
      }
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

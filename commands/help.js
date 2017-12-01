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


      /* Commands Moderators Can Use */
      // Basic controls
      =${helpPanel.moderatorCommands.basic.join("\n=")}

      // VERSION v${packagefile.version} release
      \`\`\`
      `)

    try {
      if (message.content.split(" ")[1] === '--onserver') {
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

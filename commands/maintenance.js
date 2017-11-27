const ess = require('../ess');
const fs = require('fs');
const path = require('path')
module.exports = {
  purpose: function(message) {
    try {
      var botData = fs.readFileSync(path.join(__dirname, '..') + '/bot.json');
      var bot = JSON.parse(botData);

      function updateInfo(ninfo) {
        // ninfo stands for "New Info"
        fs.writeFile((path.join(__dirname, '..') + '/bot.json'), JSON.stringify(ninfo, null, 2), (err) => {
          if (err) {
            message.channel.send(ess.errorHandle(err));
            return;
          };
        });
      }

      if (bot.maintenance == true) {
        bot.maintenance = false
        updateInfo(bot)
        message.channel.send(`The bot is now off maintenance mode. All the available commands are enabled from other users including the bot owner. Maintenance mode panel is now disabled. For development purposes, take a look at bot.json for a view of a successful/unsuccessful toggle. \`\`\`${bot.maintenance}\`\`\``)
        return;
      } else {
        bot.maintenance = true
        updateInfo(bot)
        message.channel.send(`The bot is now on maintenance mode. All the available commands are disabled from other users except the bot owner. Every time they run a command it will display a maintenance mode panel. For development purposes, take a look at bot.json for a view of a successful/unsuccessful toggle. \`\`\`${bot.maintenance}\`\`\``)
        return;
      }
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

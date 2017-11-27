const ess = require('../ess');
const fs = require('fs');
const bot = require('../package.json');

require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

module.exports = {
  purpose: function(message) {
    try {
      let version = bot.version
      if (message.content.split(" ")[1]) {
        version = message.content.split(" ")[1]
      }
      message.channel.send({
        embed: {
          color: 0xd38cff,
          description: require(`../changelog/${version}.txt`)
        }
      })
      return;
    } catch (err) {
      let errorMessage = ess.errorHandle(err)
      if (errorMessage.includes("Cannot find module")) {
        message.channel.send("That version does not exsist in our changelog database! :anguished:")
        return;
      }
      message.channel.send(ess.errorHandle(err));
    }
  }
}

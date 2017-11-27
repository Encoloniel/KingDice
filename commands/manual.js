const ess = require('../ess');
const fs = require('fs');

require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

module.exports = {
  purpose: function(message) {
    try {
      if (!message.content.split(" ")[1]) {
        message.channel.send("Please provide a command for the manual!")
        return;
      }
      let command = message.content.split(" ")[1]
      message.channel.send({
        embed: {
          color: 0xd38cff,
          description: require(`../manuals/${command}.txt`)
        }
      })
      return;
    } catch (err) {
      let errorMessage = ess.errorHandle(err)
      if (errorMessage.includes("Cannot find module")) {
        message.channel.send("Manual not found for that command! :anguished:")
        return;
      }
      message.channel.send(ess.errorHandle(err));
    }
  }
}

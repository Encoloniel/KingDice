const ess = require('../ess');

module.exports = {
  purpose: function(message) {
    try {
      if (!Number(message.content.split(" ")[1])) {
        message.channel.send("Please provide a number for amount of messages to be deleted.")
        return;
      }
      let deleteCount = parseInt(message.content.split(" ")[1])
      if (deleteCount > 99) {
        message.channel.send("Yikes! The max limit for message bulkDelete is 100");
        return;
      }

      message.channel.fetchMessages({
        limit: deleteCount + 1
      }).then(messages => message.channel.bulkDelete(messages));
      message.channel.send("Purged and cleared!").then(msg => msg.delete())


    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

const ess = require('../ess');

module.exports = {
  purpose: function(message) {
    try {
      let splitmes = message.content.split(" ");
      if (!splitmes[1]) {
        message.channel.send("Enter more than two arguments.")
      }
      message.channel.send(splitmes.slice(1).join("-"))
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

const ess = require('../ess');

module.exports = {
  purpose: function(message) {
    try {
      let splitmes = message.content.split(" ");
      if (!splitmes[1]) {
        message.channel.send("Enter more than two arguments.")
        return;
      }
      let textarray = []
      for (var i = 1; i < splitmes.length; i++) {
        textarray.push(splitmes[i].toString().charAt(0).toUpperCase() + splitmes[i].toString().slice(1));
      }
      message.channel.send(textarray.join(" "))
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

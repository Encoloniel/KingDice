const ess = require('../ess');
module.exports = {
  purpose: function(message) {
    try {
      message.channel.send("https://i.imgur.com/jSxJWBG.jpg")
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

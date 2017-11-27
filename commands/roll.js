const ess = require('../ess');

module.exports = {
  purpose: function(message) {
    try {
      let rannum = parseInt(Math.random() * (6 - 1) + 1);
      message.channel.send(`You've rolled a ${rannum}`)
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

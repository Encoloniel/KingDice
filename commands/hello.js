const ess = require('../ess');

module.exports = {
  purpose: function(message) {
    try {
      message.channel.send("I’m Mr King Dice, I'm the game'st in the land. I never play nice; I'm the devil’s right hand man! I am a bot that gives fun in the server, provide many moderation commands, coding help/commands, and more! Ask me anything or do **=help** to find out more of what I can do! https://vignette.wikia.nocookie.net/cuphead/images/7/74/King_Dice.PNG/revision/latest?cb=20171007204801")
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

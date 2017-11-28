const ess = require('../ess');
const index = require('../index');

module.exports = {
  purpose: function(message, client) {
    try {
      let mes
      let magicballanswers = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'It is true', 'Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', "Don't count on it", 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful']
      let rannum = Math.random() * (19 - 0) + 0
      message.channel.send("Hmmmm").then(
        message => {
          setTimeout(function() {
            repeat();
          }, 300);

          function repeat() {
            try {
              for (var i = 0; i < 3; i++) {
                rannum = parseInt(Math.random() * (20 - 1) + 5)
                message.edit(":8ball: " + magicballanswers[rannum])
              }
            } catch (err) {
              message.channel.send(ess.errorHandle(err));
              return;
            }
          }
        })
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
      return;
    }
  }
}

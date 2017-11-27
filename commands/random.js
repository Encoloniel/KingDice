const ess = require('../ess');

module.exports = {
  purpose: function(message) {
    try {
      let splitmes = message.content.split(" ");

      if (splitmes.length < 2) {
        message.channel.send("Please specify more than 3 arguments. This contains the command, min num, and max num. ```=random <min> <max> [--integer]```")
        return;
      }
      console.log(Number(splitmes[1]) == NaN);
      if (!Number(splitmes[1]) || !Number(splitmes[2])) {
        message.channel.send("You need to have the second and third argument being numbers.")
        return;
      }
      let min = Number(splitmes[1])
      let max = Number(splitmes[2])
      let rannum = Math.random() * (max - min) + min;
      if (message.content.includes("--integer")) {
        rannum = parseInt(rannum)
      }
      message.channel.send(`The number found is ${rannum}`)
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

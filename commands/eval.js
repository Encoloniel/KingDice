const ess = require('../ess');

module.exports = {
  purpose: function(message, client) {
    try {

      // For the help of eval
      let guild = message.guild
      let me = message.guild.member(message.author)

      function getUser(id) {
        return message.guild.members.get(id)
      }

      const args = message.content.split(" ").slice(1);
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(ess.clean(evaled), {
        code: "xl"
      }).catch(err => message.channel.send(`Oops! ${err}`))
    } catch (err) {
      message.channel.send(ess.errorHandle(err));

    }
  }
}

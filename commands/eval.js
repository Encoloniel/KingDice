const ess = require('../ess');

module.exports = {
  purpose: function(message, client) {
    try {

      // For the help of eval

      //Users
      let Guild = message.guild
      let User = message.guild.member(message.author).user
      let GuildUser = message.guild.member(message.author)
      let Client = client
      let ClientUser = client.user
      let GuildUserClient = message.guild.member(client)

      //Channels
      let GuildChannel = message.channel
      let VoiceChannel = GuildUser.voiceChannel


      function getMember(id) {
        return message.guild.members.get(id)
      }

      function getUser(id) {
        return client.users.get(id)
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

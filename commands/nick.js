const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');

module.exports = {
  purpose: function(message) {
    try {
      let member = message.mentions.members.first();
      var mentioned = false
      var numberCount = 2
      if (message.mentions.members.array().length > 1) {
        message.channel.send("You cannot change multiple user's nickname at the same time.")
        return;
      }

      if (!member) {
        member = message.guild.members.get(message.author.id)
      } else {
        mentioned = true
      }
      if (mentioned) {
        if (!message.guild.member(message.author).hasPermission("MANAGE_NICKNAMES")) {
          message.channel.send("You can't manage other's nicknames")
          return;
        }
      } else {
        numberCount = 1
      }
      let nickname = message.content.split(" ").slice(numberCount).join(" ")

      member.setNickname(`${nickname}`)
        .then(() => {
          if (!nickname) {
            nickname = "its default"
          }
          message.channel.send(`${member.user.tag}'s nickname is set to ${nickname}!`)
        })
        .catch(() => {
          message.channel.send(`Uhm, for some reason I can't do that! Maybe character limits? Maybe permission problems? :thinking:`)
        })
      return;


    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

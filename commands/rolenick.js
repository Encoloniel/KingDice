const ess = require('../ess');

module.exports = {
  purpose: function(message) {
    try {
      let member = message.guild.member(message.author);
      if (!member.roles) {
        message.channel.send("You don't have any roles!")
      } else {
        member.setNickname(`[${member.highestRole.name}] ${member.user.username}`)
          .then(() => {
            message.channel.send(`Your nickname is set to [${member.highestRole.name}] ${member.user.username}!`)
          })
          .catch(() => {
            message.channel.send(`Uhm, for some reason I can't do that! Maybe character limits? Maybe permission problems? :thinking:`)
          })
      }
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

const ess = require('../ess');

module.exports = {
  purpose: function(message) {
    try {

      let userid = message.content.split(" ").slice(1).join(" ")
      if (!userid) {
        message.channel.send("Please use an ID of the user to unban.");
        return;
      }
      message.guild.unban(userid)
        .then(() => {
          message.channel.send(`<@${userid}> has been unbaned by ${message.author.tag}. Happy returning!`)
        })
        .catch(() => {
          message.channel.send(`Doesn't seem like a valid member to me :thinking:`)
        })
      return;


    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

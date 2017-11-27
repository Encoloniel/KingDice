const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');

module.exports = {
  purpose: function(message) {
    try {
      let role = message.guild.roles.find("name", "Muted");
      let member = message.mentions.members.first();
      if (!member) {
        message.channel.send("Please mention a valid member in this guild.");
        return;
      }

      if (!member.roles.find("name", "Muted")) {
        message.channel.send("User is already unmuted!")
        return;
      }

      message.guild.member(member).removeRole(role).catch(err => message.channel.send(ess.errorHandle(err)))
      message.channel.send("Unmuted User")
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

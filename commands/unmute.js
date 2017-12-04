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

      member.removeRole(role).catch(e => e)
      member.setMute(false)
      message.channel.permissionOverwrites.get(member.id).delete()
      message.channel.send("Unmuted User!")
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

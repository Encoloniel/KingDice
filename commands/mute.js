const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');

module.exports = {
  purpose: function(message, client) {
    try {
      let role = message.guild.roles.find("name", "Muted");
      let member = message.mentions.members.first();
      let bot = message.guild.member(client.user);

      if (!member) {
        message.channel.send("Please mention a valid member in this guild.");
        return;
      }
      if (!role) {
        message.guild.createRole({
          name: 'Muted',
          color: 'BLACK',
        }).catch(err => message.channel.send(ess.errorHandle(err)))
        message.channel.send("There was no Muted role so I created it. Try the mute command again.")
        return;
      }

      member.setMute(true)
      message.channel.overwritePermissions(member, {
        "SEND_MESSAGES": false
      })
      member.addRole(role)
      message.channel.send("Muted!")
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

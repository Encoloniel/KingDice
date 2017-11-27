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
      }

      message.guild.member(member).addRole(role)
        .then(() => {
          message.channel.send(`Muted User!`)
        })
        .catch(() => {
          message.channel.send(`Uhm, for some reason I can't do that! Maybe the role does not exsist? Maybe permission problems? :thinking:`)
        })

    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

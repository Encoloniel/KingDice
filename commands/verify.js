const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');

module.exports = {
  purpose: function(message, client) {
    try {
      let role = message.guild.roles.find("name", "Verified");
      if (!role) {
        message.guild.createRole({
          name: 'Verified',
          color: 'GREEN',
        }).catch(err => message.channel.send(ess.errorHandle(err)))
      }
      message.guild.member(message.author).addRole(role).catch(err => message.channel.send(ess.errorHandle(err)))
      message.channel.send("Verified!")
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

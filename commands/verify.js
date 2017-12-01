const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');

module.exports = {
  purpose: function(message, client) {
    try {
      var role = message.guild.roles.find("name", "Verified");
      if (!role) {
        message.guild.createRole({
          name: 'Verified',
          color: 'GREEN',
        }).then(createdRole => role = createdRole).catch(err => message.channel.send(ess.errorHandle(err)))
      }
      message.guild.member(message.author).addRole(role).catch(err => message.channel.send(ess.errorHandle(err)))
      message.channel.send("Verified!")
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

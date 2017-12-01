const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');

module.exports = {
  purpose: function(message, client) {
    try {
      if (!message.guild.roles.find("name", "Verified")) {
        message.guild.createRole({
          name: 'Verified',
          color: 'GREEN',
        }).catch(err => message.channel.send(ess.errorHandle(err)))
        message.channel.send("There was no Verified role so I created it. Next time you can use =verify to verify yourself!")
        return;
      }
      let role = message.guild.roles.find("name", "Verified");
      message.guild.member(message.author).addRole(role).catch(err => message.channel.send(ess.errorHandle(err)))
      message.channel.send("Verified!")
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

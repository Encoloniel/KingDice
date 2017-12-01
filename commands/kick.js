const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');

module.exports = {
  purpose: function(message) {
    try {
      let member = message.mentions.members.first();
      if (!member) {
        message.channel.send("Please mention a valid member in this guild.");
        return;
      }
      if (!member.kickable) {
        message.channel.send("I cannot kick this user. Please check permissions.");
        return;
      }

      let reason = message.content.split(" ").slice(2).join(" ")
      if (!reason) {
        message.channel.send("Please indicate a reason for the kick!");
        return;
      }
      if (!message.content.includes("--silent")) {
        member.send(stripIndents `
      **You have been kicked!**
      **Server:** ${message.guild.name}
      **Reason:** ${reason}
      **Moderator:** <@${message.author.id}>

      *Oh, no! Seems like you have been kicked!*

      You have been kicked. This could be unfortunate or fortunate to you, depends on what you wanted to happen :thinking:
      `)
      }
      setTimeout(function() {
        kickPerson();
      }, 5000);

      function kickPerson() {
        member.kick(reason)
        message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag} for reason: ${reason}`);
      }
      return;


    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

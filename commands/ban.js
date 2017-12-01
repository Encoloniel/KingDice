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
      if (!member.bannable) {
        message.channel.send("I cannot ban this user. Please check permissions.");
        return;
      }

      let reason = message.content.split(" ").slice(2).join(" ")
      if (!reason) {
        message.channel.send("Please indicate a reason for the ban!");
        return;
      }
      if (!message.content.includes("--silent")) {
        member.send(stripIndents `
      **You have been banned! - PERMANENT**
      **Server:** ${message.guild.name}
      **Reason:** ${reason}
      **Moderator:** <@${message.author.id}>

      *Oh, no! Seems like you have been banned!*

      You have been banned. This could be unfortunate or fortunate to you, depends on what you wanted to happen :thinking:
      `)
      }

      setTimeout(function() {
        banPerson();
      }, 5000);

      function banPerson() {
        member.ban(reason)
        message.channel.send(`${member.user.tag} has been banned (${member.user.id}) by ${message.author.tag} for reason: ${reason}`);
      }
      return;


    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

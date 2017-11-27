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
      member.send(stripIndents `
      **You have been kicked!**
      **Server:** ${message.guild.name}
      **Reason:** ${reason}
      **Moderator:** <@${message.author.id}>

      *Oh, no! Seems like you have been kicked! What do I do now?*

      You have been kicked. This could be unfortunate or fortunate to you, depends on what you wanted to happen :thinking:
      If you see this as bad news and would like to appeal and say sorry for one more chance, please join our appeal Discord server.(Link: https://discord.gg/FSZwEBV) If you break any of the rules in this server in here, you will be permanently kicked from all of the servers *and* the appeals server.

      Sad news, if you have done something that is very offensive or unforgivable by the admins, you are getting banned from the appeals server and will never be able to join the Gaze server again. You can use an alt though ;)

      By the way, we still love you no matter what you did. Even though we hated, we weren't that offended. :heart:`)

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

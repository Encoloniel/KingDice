const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');

module.exports = {
  purpose: function(message, client, Discord) {
    try {
      if (message.mentions.members.first()) {
        let member = message.mentions.members.first().user
        let guildMember = message.mentions.members.first()
        const embed = new Discord.RichEmbed()
          .setDescription("Description and information about " + member.tag)
          .setAuthor(member.username, member.displayAvatarURL)
          .setColor(0xd38cff)
          .setThumbnail(member.displayAvatarURL)
          .setTimestamp(new Date())
          .setFooter("King Dice", client.user.avatarURL)
          .addField("ID", member.id)
          .addField("Discriminator", member.discriminator)
          .addField("Status", member.presence.status)

          .addField("Nickname", guildMember.nickname)
          .addField("Moderator", guildMember.hasPermission("BAN_MEMBERS"))
          .addField("Joined at", guildMember.joinedAt)
          .addField("Role(s)", guildMember.roles.array().join(", "))
        message.channel.send(embed)
      } else {
        let member = message.author
        let guildMember = message.guild.member(member)
        const embed = new Discord.RichEmbed()
          .setDescription("Description and information about " + member.tag)
          .setAuthor(member.username, member.displayAvatarURL)
          .setColor(0xd38cff)
          .setThumbnail(member.displayAvatarURL)
          .setTimestamp(new Date())
          .setFooter("King Dice", client.user.avatarURL)
          .addField("ID", member.id)
          .addField("Discriminator", member.discriminator)
          .addField("Status", member.presence.status)

          .addField("Nickname", guildMember.nickname)
          .addField("Moderator", guildMember.hasPermission("BAN_MEMBERS"))
          .addField("Joined at", guildMember.joinedAt)
          .addField("Role(s)", guildMember.roles.array().join(", "))
        message.channel.send(embed)
      }
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

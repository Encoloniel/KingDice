const ess = require('../ess');


module.exports = {
  purpose: function(message, client, Discord) {
    try {
      let guild = message.guild

      const embed = new Discord.RichEmbed()
        .setDescription("Description and information about this server")
        .setColor(0xd38cff)
        .setThumbnail(guild.iconURL)
        .setTimestamp(new Date())
        .addField("Name", guild.name)
        .addField("ID", guild.id)
        .addField("Owner", guild.owner.user.tag)
        .addField("Region", guild.region)

        .addField("Verification Level", guild.verificationLevel)
        .addField("Channels", guild.channels.array().length)
        .addField("Members", guild.memberCount)
        .addField("Creation Date", guild.createdAt)

      message.channel.send(embed)
      return;
    } catch (err) {
      console.log(err);
      message.channel.send(ess.errorHandle(err));
    }
  }
}

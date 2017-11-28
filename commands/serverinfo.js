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
        .addField("Name", guild.name, true)
        .addField("ID", guild.id, true)
        .addField("Owner", guild.owner.user.tag, true)
        .addField("Region", guild.region, true)

        .addField("Verification Level", guild.verificationLevel, true)
        .addField("Channels", guild.channels.array().length, true)
        .addField("Members", guild.memberCount, true)
        .addField("Creation Date", guild.createdAt, true)

      message.channel.send(embed)
      return;
    } catch (err) {
      console.log(err);
      message.channel.send(ess.errorHandle(err));
    }
  }
}

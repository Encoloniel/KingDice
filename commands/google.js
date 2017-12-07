const ess = require('../ess');

module.exports = {
  purpose: function(message, client, Discord) {
    try {
      var google = require('google')
      let splitmes = message.content.split(" ")
      google.resultsPerPage = 5

      if (!splitmes[1]) return message.channel.send("Enter something to search on Google!")

      google(splitmes.slice(1).join(" "), function(err, res) {
        if (err) return ess.errorHandle(err)
        var link = res.links[0];
        if (!link) return message.channel.send("I couldn't get a match for what you searched :thinking:")
        if (link.title == "") link = res.links[1]
        if (link.title == "") return message.channel.send("I couldn't get a match for what you searched :thinking:")


        let linkDetails = new Discord.RichEmbed()
          .setAuthor(`Google search for ${splitmes.slice(1).join(" ")}`, "https://pbs.twimg.com/profile_images/848802469077549056/HqAfzEDT.jpg", link.link)
          .setTitle(link.href)
          .setDescription(link.description)
          .setColor(0xd38cff)

        message.channel.send(linkDetails)
      })

    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

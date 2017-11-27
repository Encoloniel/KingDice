const ess = require('../ess');
const ud = require('urban-dictionary')

module.exports = {
  purpose: function(message, client, Discord) {
    try {
      let splitmes = message.content.split(" ");
      if (!splitmes[1]) {
        message.channel.send("Enter a word to search!")
        return;
      }
      let search = splitmes.slice(1).join(" ")

      ud.term(search, function(error, entries, tags, sounds) {
        if (error) {
          message.channel.send("I couldn't find a definition for that :thinking:")
        } else {
          let term = entries[0]

          let word = term.word
          let definition = term.definition
          let example = term.example
          let author = term.author
          let thumbs_up = term.thumbs_up
          let thumbs_down = term.thumbs_down
          let id = term.defid


          const rich = new Discord.RichEmbed()
            .setDescription("Search term information about " + word)
            .setColor(0xd38cff)
            .setAuthor(term.author + " - Definition author")
            .setThumbnail("https://vignette.wikia.nocookie.net/creation/images/b/b7/Urban_dictionary_--_logo.jpg/revision/latest?cb=20161002212954")
            .setTimestamp(new Date())
            .setFooter("King Dice", client.user.avatarURL)
            .addField("Word", word)
            .addField("Definition", definition)
            .addField("Example in a sentence", example)
            .addField("Accuracy", Math.round((thumbs_up / (thumbs_up + thumbs_down) * 100) * 100) / 100 + "%")
            .addField("Link", `https://www.urbandictionary.com/define.php?term=${word.split(" ").join("+")}&defid=${id}`)


          message.channel.send(rich)
        }
      })

      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

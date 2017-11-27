const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');
const ytdl = require('ytdl-core');
const opusscript = require('opusscript');

module.exports = {
  purpose: function(message, client, Discord) {
    try {

      if (!message.content.split(" ")[1]) {
        message.channel.send("Enter a word to search!")
      }
      var spelling = require('spelling'),
        dictionary = require('../dictionaries/en_US.js');
      var dict = new spelling(dictionary);
      var word = message.content.split(" ")[1].toString()

      if (dict.lookup(word).suggestions.length < 1) {
        message.channel.send("That word is not in the English dictionary; and also I couldn't find a suggestion word for it!")
        return;
      }

      if (!dict.lookup(word).found) {
        let suggestion1 = dict.lookup(word).suggestions[0].word
        let suggestion2 = dict.lookup(word).suggestions[1].word
        let suggestion3 = dict.lookup(word).suggestions[2].word

        message.channel.send(stripIndents `Ouch, that word is not in the dictionary. Surely you meant one if these in the examples?
          \`\`\`
          ${suggestion1}
          ${suggestion2}
          ${suggestion3}
          \`\`\`
          `)
      } else {
        message.channel.send("That word is correctly spelled and is in the English dictionary!")
      }

      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

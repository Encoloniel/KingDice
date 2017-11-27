const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');
var spelling = require('spelling'),
  dictionary = require('../dictionaries/en_US.js');


module.exports = {
  purpose: function(message) {
    try {

      if (!message.content.split(" ")[1]) {
        message.channel.send("Enter a word to search!")
      }
      var dict = new spelling(dictionary);
      var word = message.content.split(" ")[1].toString()


      if (!dict.lookup(word).found) {
        if (dict.lookup(word).suggestions.length < 1) {
          message.channel.send("That word is not in the English dictionary; and also I couldn't find a suggestion word for it!")
          return;
        }
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
      console.log(err);
      message.channel.send(ess.errorHandle(err));
    }
  }
}

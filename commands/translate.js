const ess = require('../ess');
const translate = require('google-translate-api');
const isoConv = require('iso-language-converter');

module.exports = {
  purpose: function(message) {
    if (!message.content.split(" ")[1]) {
      message.channel.send("You need to provide a sentence first!")
      return;
    }
    translate(message.content.split(" ").slice(1).toString(), {
      from: 'auto',
      to: 'en'
    }).then(res => {
      message.channel.send(`
        From ${isoConv(res.from.language.iso)} (${res.from.language.iso}) to English
        `)
      message.channel.send(res.text);
      return;
    }).catch(err => {
      message.channel.send(ess.errorHandle(err));
    });
  }
}

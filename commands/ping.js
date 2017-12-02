const ess = require('../ess');

module.exports = {
  purpose: function(message, client) {
    try {
      let embedMessage = {
        embed: {
          color: 0xd38cff,
          fields: [{
              name: "Message Roundtrip",
              value: `${Math.abs(Date.now() - message.createdTimestamp)} ms`
            },
            {
              name: "Ping",
              value: "pinging..."
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "King Dice"
          }
        }
      }
      message.channel.send(embedMessage).then(sent => {
        embedMessage.embed.fields[2].value = sent.createdTimestamp - message.createdTimestamp + "ms"
        sent.edit(embedMessage);
      });
      message.channel.send(embedMessage);
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

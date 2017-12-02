const ess = require('../ess');

module.exports = {
  purpose: function(message, client) {
    try {
      let beforedate = Date.now()
      let embedMessage = {
        embed: {
          color: 0xd38cff,
          fields: [{
              name: "Message -> Code",
              value: `${Math.abs(Date.now() - message.createdTimestamp)} ms`
            },
            {
              name: "Code -> Channel",
              value: "pinging..."
            },
            {
              name: "Message -> Channel",
              value: "pinging..."
            },
            {
              name: "Avg. Ping",
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
        embedMessage.embed.fields[1].value = (sent.createdTimestamp - message.createdTimestamp) + "ms"
        sent.edit(embedMessage);
        embedMessage.embed.fields[2].value = Math.abs(beforedate - Date.now()) + "ms"
        sent.edit(embedMessage);
        let mf = embedMessage.embed.fields
        embedMessage.embed.fields[3].value = Math.round((parseInt(mf[0].value) + parseInt(mf[1].value) + parseInt(mf[2].value)) / 3) + "ms"
        sent.edit(embedMessage);
      });
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

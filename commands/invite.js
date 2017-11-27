const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');

module.exports = {
  purpose: function(message, client) {
    try {

      let invitemenu = {
        embed: {
          color: 0xd38cff,
          title: "Invite Links",
          description: "Thank you for using King Dice the bot! To use this bot for yourself, you can go to the link below to add it into your server.",
          fields: [{
              name: "**Bot Permissions (recommended)**",
              value: `https://goo.gl/KmWT1R`
            },
            {
              name: "**Without Permissions**",
              value: `https://goo.gl/dsoqC`
            },
            {
              name: "If you need support/help, contact us on our server",
              value: "https://discord.gg/eZgg87"
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "King Dice"
          }
        }
      }
      message.channel.send(invitemenu)
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

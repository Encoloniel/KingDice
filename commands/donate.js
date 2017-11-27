const ess = require('../ess');

module.exports = {
  purpose: function(message, client) {
    try {

      let donationmenu = {
        embed: {
          color: 0xd38cff,
          title: "Invite Links",
          description: "Thank you for using King Dice the bot! To donate to the creators of the bot as a thank you, here are some links you can check out.",
          fields: [{
              name: "**PayPal (preferred)**",
              value: `https://paypal.me/gazedev`
            },
            {
              name: "**Patreon (for monthly donations)**",
              value: `NO LINK YET`
            },
            {
              name: "If you donate, you will be able to get a Donator role in my Discord server!",
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
      message.channel.send(donationmenu)
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

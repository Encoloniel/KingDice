const ess = require('../ess');

module.exports = {
  purpose: function(message, client) {
    try {
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: "Click here for Google.com",
          url: "http://google.com",
          description: "This is a test embed to showcase what they look like and what they can do.",
          fields: [{
              name: "Field 1",
              value: "They can have different fields with small headlines."
            },
            {
              name: "Masked links",
              value: "You can put masked links: [Google](http://google.com) inside of rich embeds."
            },
            {
              name: "Markdown",
              value: "You can put all the *usual* **Markdown** ~~inside~~ of them."
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Example"
          }
        }
      })
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

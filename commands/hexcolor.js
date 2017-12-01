const ess = require('../ess');
const index = require('../index');

module.exports = {
  purpose: function(message, client, Discord) {
    try {
      let splitmes = message.content.split(" ")
      if (splitmes[1]) {
        if (!/^[0-9A-F]{6}$/i.test(splitmes[1].toString())) {
          message.channel.send("That is not a correct hex value! (Tip. Try without the pound '#')")
          return;
        } else {
          let hexValue = splitmes[1].toString()
          let embedCode = new Discord.RichEmbed()
            .setTitle(`Hex value ${hexValue}`)
            .setDescription("The color of the hex")
            .setColor(parseInt(`0x${hexValue}`))
            .setImage(`http://www.colorhexa.com/${hexValue}.png`)
            .setTimestamp(new Date())
            .setFooter("King Dice", client.user.avatarURL, true)

          message.channel.send(embedCode)
          return;
        }
      } else {
        message.channel.send("Provide a hex value to search!")
        return;
      }
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
      return;
    }
  }
}

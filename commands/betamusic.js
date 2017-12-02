const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');
const ytdl = require('ytdl-core');
const opusscript = require('opusscript');

module.exports = {
  purpose: function(message, client, Discord) {
    let member = message.guild.member(message.author)
    try {

      // Play function
      function play(connection, message) {
        let server = member.voiceChannel
        let music = message.content.split(" ").slice(2).toString()
        server.dispatcher = connection.playStream(
          ytdl(music, {
            filter: "audioonly"
          })
        )
      }

      if (!member.voiceChannel) {
        message.channel.send("You are not in a voice channel")
        return;
      }
      if (!message.content.split(" ")[1]) {
        message.channel.send("Second argument must be either ```<join|leave|play>```")
        return;
      }
      if (message.content.split(" ")[1] == "join") {
        member.voiceChannel.join()
        message.channel.send("I joined in your channel!")
      }
      if (message.content.split(" ")[1] == "leave") {
        member.voiceChannel.leave()
        message.channel.send("I leaved the channel!")
      }
      if (message.content.split(" ")[1] == "play") {
        if (!message.content.split(" ")[2]) {
          message.channel.send("Provide a music link please.")
          return;
        }
        if (ytdl.validateURL(message.content.split(" ")[2]) || ytdl.validateID(message.content.split(" ")[2])) {
          message.channel.send("Not a valid link/id")
          return;
        }
        member.voiceChannel.join().then(function(connection) {
          play(connection, message)
        })
        message.channel.send(`Now playing: **${message.content.split(" ")[2]}**`)
      }

      return;
    } catch (err) {
      console.log(err);
      message.channel.send(ess.errorHandle(err));
    }
  }
}

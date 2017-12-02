const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');
const ytdl = require('ytdl-core');
const opusscript = require('opusscript');

module.exports = {
  purpose: function(message) {

    let member = message.guild.member(message.author)
    try {
      // Play function
      function play(connection, url) {
        let server = member.voiceChannel
        server.dispatcher = connection.playStream(url)

      }

      if (!member.voiceChannel) {
        message.channel.send("You are not in a voice channel")
        return;
      }
      if (!message.content.split(" ")[1]) {
        message.channel.send("Please define a word/sentence to convert tts")
        return;
      }
      var googleTtsApi = require("google-tts-api")

      googleTtsApi(message.content.split(" ").slice(1).join(" "), 'en', 1)
        .then(function(url) {
          member.voiceChannel.join().then(function(connection) {
            play(connection, url)
          })
        })
        .catch(function(err) {
          message.channel.send(ess.errorHandle(err.stack));
        });
      message.channel.send("Playing!")

      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

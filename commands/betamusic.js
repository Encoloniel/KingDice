const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');
const ytdl = require('ytdl-core');
const opusscript = require('opusscript');
const bot = require('../bot.json');

module.exports = {
  purpose: function(message, client, Discord) {
    let member = message.guild.member(message.author)
    try {

      // Play function
      function play(connection, video) {
        let server = member.voiceChannel
        server.dispatcher = connection.playStream(
          ytdl(video, {
            filter: "audioonly"
          })
        )
      }

      if (!member.voiceChannel) {
        message.channel.send("You are not in a voice channel")
        return;
      }
      if (!message.content.split(" ")[1]) {
        message.channel.send("Second argument must be either ```<leave|play>```")
        return;
      }
      if (message.content.split(" ")[1] == "leave") {
        member.voiceChannel.leave()
        message.channel.send("I leaved the channel!")
      }
      if (message.content.split(" ")[1] == "play") {
        member.voiceChannel.leave()
        if (!message.content.split(" ")[2]) {
          message.channel.send("Provide a music link please.")
          return;
        }
        let video = message.content.split(" ").slice(2).join(" ")
        let videoName = "Undefined"

        if (!ytdl.validateURL(video) && !ytdl.validateID(video)) {
          var search = require('youtube-search');
          var opts = {
            maxResults: 5,
            key: bot.apiKey
          };
          search(video, opts, function(err, results) {
            if (err) return console.log(err);
            for (var i = 0; i < results.length; i++) {
              if (results[i].kind == "youtube#video") {
                video = results[i].id
                videoName = results[i].title
                message.channel.send(`Now playing: **${videoName}**`)
                return;
              }
            }
          })
          //If the search is not a id or a link
        } else {
          message.channel.send(`Now playing: **${video}**`)
        }
        member.voiceChannel.join().then(function(connection) {
          play(connection, video)
        })

      }

      return;
    } catch (err) {
      console.log(err);
      message.channel.send(ess.errorHandle(err));
    }
  }
}

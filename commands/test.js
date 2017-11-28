const ess = require('../ess');
const {
  stripIndents
} = require('common-tags');
const ytdl = require('ytdl-core');
const opusscript = require('opusscript');

module.exports = {
  purpose: function(message, client, Discord) {
    try {
      message.channel.send("**No tests are made**")
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

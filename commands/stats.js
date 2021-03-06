const ess = require('../ess');
const os = require("os");
const botInfo = require("../package.json")

module.exports = {
  purpose: function(message, client, Discord) {
    try {

      //CPU Stuff
      function cpuAverage() {
        var totalIdle = 0,
          totalTick = 0;
        var cpus = os.cpus();

        for (var i = 0, len = cpus.length; i < len; i++) {
          var cpu = cpus[i];
          for (type in cpu.times) {
            totalTick += cpu.times[type];
          }
          totalIdle += cpu.times.idle;
        }
        return {
          idle: totalIdle / cpus.length,
          total: totalTick / cpus.length
        };
      }

      var startMeasure = cpuAverage();

      setTimeout(function() {
          var endMeasure = cpuAverage();
          var idleDifference = endMeasure.idle - startMeasure.idle;
          var totalDifference = endMeasure.total - startMeasure.total;
          var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
          //CPU STUFF OVER

          var botMembers = client.users.size

          //HHMMSS
          String.prototype.toHHMMSS = function() {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
              hours = "0" + hours;
            }
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
            var time = hours + ':' + minutes + ':' + seconds;
            return time;
          }
          //

          const rich = new Discord.RichEmbed()
            .setTitle("Server Internal Status")
            .setDescription("Shows you the internal specification of the server's status")
            .setColor(0xd38cff)
            .setThumbnail("https://nodejs.org/static/images/logo-hexagon.png")
            .setTimestamp(new Date())
            .setFooter("King Dice", client.user.avatarURL, true)
            .addField("CPU Percentage", `${percentageCPU}%`, true)
            .addField("RAM Usage", `${Math.round(process.memoryUsage().heapUsed/ 1024 / 1024 * 100) / 100} MB`, true)
            .addField("Uptime", `${process.uptime().toString().toHHMMSS()}`, true)
            .addField("Guilds", client.guilds.array().length, true)
            .addField("Users", botMembers, true)
            .addField("Bot Version", `v${botInfo.version}`, true)
            .addField("DiscordJS Version", `v${botInfo.dependencies["discord.js"].slice(1)}`, true)

          message.channel.send(rich);

        },
        100);
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

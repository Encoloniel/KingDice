const ess = require('../ess');
const shelljs = require('shelljs');

module.exports = {
  purpose: function(message) {
    try {

      const args = message.content.split(" ").slice(1);
      const command = args.join(" ");
      let execution = shelljs.exec(command, {
        silent: true
      })

      message.channel.send(ess.clean(execution.stdout), {
        code: "xl"
      }).catch(err => message.channel.send(`Oops! ${err}`))

      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));

    }
  }
}

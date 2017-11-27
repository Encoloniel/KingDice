const ess = require('../ess');

module.exports = {
  purpose: function(withoutCommandMessage) {
    try {
      let message = withoutCommandMessage.messageobj;
      let messagecontent = withoutCommandMessage.withoutCommand;
      let splitmes = messagecontent.split(". ");
      if (!splitmes[1]) {
        message.channel.send("Enter more than two arguments/sentences")
        return;
      }
      let textarray = []
      for (var i = 0; i < splitmes.length; i++) {
        textarray.push(splitmes[i].toString().charAt(0).toUpperCase() + splitmes[i].toString().slice(1));
      }
      message.channel.send(textarray.join(". "))
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
}

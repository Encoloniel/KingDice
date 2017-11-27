const fs = require('fs');
const path = require('path');


function clean(text) {
  if (typeof(text) === "string") {
    let body = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    console.log(typeof body);
    return body
  } else {
    return text;
  }
}

module.exports = {
  //Snippet for Eval,
  clean: function(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  },
  errorHandle: function(error) {
    return (`\`ERROR\` \`\`\`xl\n${clean(error)}\n\`\`\`Oh dang! Something wrong went with the command. You can try fixing by reading the error, or contact <@322158876449308683> for help. Thank you, and sorry for the inconvenience.`);
  }
}

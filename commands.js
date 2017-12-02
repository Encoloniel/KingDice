const ess = require('./ess');
const bot = require('./bot.json')

// All command files
const eval = require('./commands/eval');
const help = require('./commands/help');
const hello = require('./commands/hello');
const embed = require('./commands/embed')
const embedcode = require('./commands/embedcode')
const roll = require('./commands/roll')
const random = require('./commands/random')
const magicball = require('./commands/magicball')
const kick = require('./commands/kick')
const ban = require('./commands/ban')
const unban = require('./commands/unban')
const purge = require('./commands/purge')
const test = require('./commands/test')
const translate = require('./commands/translate')
const titlecase = require('./commands/titlecase')
const lowercase = require('./commands/lowercase')
const uppercase = require('./commands/uppercase')
const sentencecase = require('./commands/sentencecase')
const hyphencase = require('./commands/hyphencase')
const snakecase = require('./commands/snakecase')
const dotcase = require('./commands/dotcase')
const verify = require('./commands/verify')
const rolenick = require('./commands/rolenick')
const warn = require('./commands/warn')
const mute = require('./commands/mute')
const unmute = require('./commands/unmute')
const userinfo = require('./commands/userinfo')
const christian = require('./commands/christian')
const dictionary = require('./commands/dictionary')
const manual = require('./commands/manual')
const ping = require('./commands/ping')
const stats = require('./commands/stats')
const invite = require('./commands/invite')
const nick = require('./commands/nick')
const serverinfo = require('./commands/serverinfo')
const music = require('./commands/music')
const spellcheck = require('./commands/spellcheck')
const changelog = require('./commands/changelog')
const maintenance = require('./commands/maintenance')
const donate = require('./commands/donate')
const bash = require('./commands/bash')
const hexcolor = require('./commands/hexcolor')
const betamusic = require('./commands/betamusic')

function isCommand(message, commandName) {
  if (message.content.split(" ")[0] == (bot.prefix + commandName)) {
    return true;
  } else {
    if (message.content.split(" ").slice(0, 1) == (`<@379800674856206336> ` + commandName)) {
      message.content = message.content.split(" ").slice(1).join(" ")
      return true;
    } else {
      return false;
    }
  }
}

function withoutCommand(message) {
  return {
    withoutCommand: message.content.split(" ").slice(1).join(" "),
    messageobj: message
  }
}


module.exports = {
  // All commands for normal users
  allCommands: function(message, client, Discord) {
    let checkPerms = function(perm, action) {
      if (!member.hasPermission(perm)) {
        message.channel.send(`You don't have perms to ${action}!`)
        return false;
      }
      if (!bot.hasPermission(perm)) {
        message.channel.send(`I don't have perms to ${action}!`)
        return false;
      } else {
        return true;
      }
    }

    let member = message.guild.member(message.author);
    let bot = message.guild.member(client.user);

    if (isCommand(message, "help")) {
      help.purpose(message)
    }
    if (isCommand(message, "hello")) {
      hello.purpose(message)
    }
    if (isCommand(message, "roll")) {
      roll.purpose(message)
    }
    if (isCommand(message, "random")) {
      random.purpose(message)
    }
    if (isCommand(message, "magicball")) {
      magicball.purpose(message, client)
    }
    if (isCommand(message, "titlecase")) {
      titlecase.purpose(message)
    }
    if (isCommand(message, "lowercase")) {
      lowercase.purpose(message)
    }
    if (isCommand(message, "uppercase")) {
      uppercase.purpose(message)
    }
    if (isCommand(message, "sentencecase")) {
      sentencecase.purpose(withoutCommand(message))
    }
    if (isCommand(message, "hyphencase")) {
      hyphencase.purpose(message)
    }
    if (isCommand(message, "snakecase")) {
      snakecase.purpose(message)
    }
    if (isCommand(message, "dotcase")) {
      dotcase.purpose(message)
    }
    if (isCommand(message, "dictionary")) {
      dictionary.purpose(message, client, Discord)
    }
    if (isCommand(message, "translate")) {
      translate.purpose(message)
    }
    if (isCommand(message, "verify")) {
      if (!bot.hasPermission("MANAGE_ROLES")) {
        message.channel.send(`I don't have perms manage roles.`)
        return false;
      } else {
        verify.purpose(message, client)
        return true;
      }
    }
    if (isCommand(message, "userinfo")) {
      userinfo.purpose(message, client, Discord)
    }
    if (isCommand(message, "christian")) {
      christian.purpose(message)
    }
    if (isCommand(message, "manual")) {
      manual.purpose(message)
    }
    if (isCommand(message, "ping")) {
      ping.purpose(message, client)
    }
    if (isCommand(message, "stats")) {
      stats.purpose(message, client, Discord)
    }
    if (isCommand(message, "invite")) {
      invite.purpose(message, client, Discord)
    }
    if (isCommand(message, "serverinfo")) {
      serverinfo.purpose(message, client, Discord)
    }
    if (isCommand(message, "music")) {
      music.purpose(message, client, Discord)
    }
    if (isCommand(message, "betamusic")) {
      betamusic.purpose(message, client, Discord)
    }
    if (isCommand(message, "spellcheck")) {
      spellcheck.purpose(message)
    }
    if (isCommand(message, "changelog")) {
      changelog.purpose(message)
    }
    if (isCommand(message, "donate")) {
      donate.purpose(message, client)
    }
    if (isCommand(message, "hexcolor")) {
      hexcolor.purpose(message, client, Discord)
    }



    if (isCommand(message, "rolenick")) {
      if (!member.hasPermission("CHANGE_NICKNAME")) {
        message.channel.send(`You don't have perms to nickname yourself.`)
        return false;
      }
      if (!bot.hasPermission("MANAGE_NICKNAMES")) {
        message.channel.send(`I don't have perms to nickname members.`)
        return false;
      } else {
        rolenick.purpose(message, client)
        return true;
      }
    }
    if (isCommand(message, "nick")) {
      if (!member.hasPermission("CHANGE_NICKNAME")) {
        message.channel.send(`You don't have perms to nickname yourself.`)
        return false;
      }
      if (!bot.hasPermission("MANAGE_NICKNAMES")) {
        message.channel.send(`I don't have perms to nickname members.`)
        return false;
      } else {
        nick.purpose(message, client)
        return true;
      }
    }

  },
  // Commands only for me
  ownerCommands: function(message, client, Discord) {
    if (isCommand(message, "eval")) {
      eval.purpose(message, client)
    }
    if (isCommand(message, "bash")) {
      bash.purpose(message)
    }
    if (isCommand(message, "test")) {
      test.purpose(message, client, Discord)
    }
    if (isCommand(message, "embed")) {
      embed.purpose(message, client)
    }
    if (isCommand(message, "embedcode")) {
      embedcode.purpose(message)
    }
    if (isCommand(message, "m")) {
      maintenance.purpose(message)
    }
  },
  // Commands for administrators on servers.
  adminCommands: function(message, client, Discord) {
    // Functions for permission check
    let checkPerms = function(perm, action) {
      if (!member.hasPermission(perm)) {
        message.channel.send(`You don't have perms to ${action}!`)
        return false;
      }
      if (!bot.hasPermission(perm)) {
        message.channel.send(`I don't have perms to ${action}!`)
        return false;
      } else {
        return true;
      }
    }

    let member = message.guild.member(message.author);
    let bot = message.guild.member(client.user);

    if (isCommand(message, "kick")) {
      if (checkPerms("KICK_MEMBERS", "kick members")) {
        kick.purpose(message)
      }
    }

    if (isCommand(message, "ban")) {
      if (checkPerms("BAN_MEMBERS", "ban members")) {
        ban.purpose(message)
      }
    }

    if (isCommand(message, "unban")) {
      if (checkPerms("BAN_MEMBERS", "unban members")) {
        unban.purpose(message)
      }
    }

    if (isCommand(message, "purge")) {
      if (checkPerms("MANAGE_MESSAGES", "manage messages")) {
        purge.purpose(message)
      }
    }

    if (isCommand(message, "warn")) {
      if (checkPerms("KICK_MEMBERS", "warn (kick) members")) {
        warn.purpose(message)
      }
    }

    if (isCommand(message, "mute")) {
      if (checkPerms("MUTE_MEMBERS", "mute members")) {
        if (checkPerms("MANAGE_ROLES", "give member the muted role")) {
          mute.purpose(message, client)
        }
      }
    }

    if (isCommand(message, "unmute")) {
      if (checkPerms("MUTE_MEMBERS", "unmute members")) {
        if (checkPerms("MANAGE_ROLES", "remve the member's muted role")) {
          unmute.purpose(message)
        }
      }
    }

    //Admincommands end
  }

}

exports.execute = async(client, message, args) => {
  if(!message.guild.me.voice.channel) return message.channel.send(':octagonal_sign: `I\'m not connected to any voice channel on this guild.`')
  if(!message.member.voice.channel) return message.channel.send(':octagonal_sign: `Please join voice channel first.`')
  if(message.member.voice.channelID !== message.guild.me.voice.channelID) return message.channel.send(':octagonal_sign: `Please join to our voice channel first.`')
  message.react('👋')
  message.guild.me.voice.channel.leave()
  delete client.cache[message.guild.id]
}

exports.info = {
  triggers: ['leave'],
  description: '',
  usage: ''
}
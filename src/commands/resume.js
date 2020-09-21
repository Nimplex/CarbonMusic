exports.execute = async(client, message, args) => {
  if(!message.member.voice.channel) return message.channel.send(':octagonal_sign: `Please join voice channel first.`')
  if(!message.guild.me.voice.channel) return message.channel.send(':octagonal_sign: `I\'m not connected to any voice channel on this guild.`') 
  if(message.member.voice.channelID !== message.guild.me.voice.channelID) return message.channel.send(':octagonal_sign: `Please join to our voice channel first.`')
  if(!client.cache[message.guild.id].dispatcher) return message.channel.send(':octagonal_sign: `I don\'t play anything.`')
  client.cache[message.guild.id].dispatcher.resume(true)
  message.react('▶️')
}

exports.info = {
  triggers: ['resume'],
  description: '',
  usage: ''
}
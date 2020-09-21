exports.execute = async(client, message, args) => {
  if(!message.member.voice.channel) return message.channel.send(':octagonal_sign: `Please join voice channel first.`')
  if(message.guild.me.voice.channel) return message.channel.send(':octagonal_sign: `Sorry but i\'m already connected to voice channel.`')
  message.react('👍')
  message.member.voice.channel.join()
  message.guild.me.voice.setSelfDeaf(true)
}

exports.info = {
  triggers: ['join'],
  description: '',
  usage: ''
}
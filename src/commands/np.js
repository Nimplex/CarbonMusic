exports.execute = async(client, message, args) => {
  if(!client.cache[message.guild.id].dispatcher) {
    message.channel.send(`:musical_note: \`Now playing: None\``)
  } else {
    message.channel.send(`:musical_note: \`Now playing: ${client.cache[message.guild.id].dispatcher.song.title} ${Math.floor(client.cache[message.guild.id].dispatcher.streamTime/60000)}m / ${Math.floor(client.cache[message.guild.id].dispatcher.song.length_seconds/60)}m\``)
  }
}

exports.info = {
  triggers: ['nowplaying', 'np'],
  description: '',
  usage: ''
}
exports.execute = async(client, message, args) => {
  if(!client.cache[message.guild.id].queue) client.cache[message.guild.id].queue = []
  const queue = client.cache[message.guild.id].queue
  let msg = ``
  queue.forEach(element => {
    msg+=`${queue.indexOf(element)+1}. ${element.info.title}\n`
  })
  if(msg.length < 1) msg = 'Empty'
  let song = client.cache[message.guild.id].dispatcher
  let { loop } = client.cache[message.guild.id]
  if(!loop) loop = false
  else loop = true
  if(!song) song = 'Nothing'
  else song = song.song.title
message.channel.send(`\`\`\`ml
[Queue for] ${message.guild.name}:
[Now playing] ${song}
[Loop] ${loop}

${msg}
\`\`\``)
}

exports.info = {
  triggers: ['q', 'queue'],
  description: '',
  usage: ''
}
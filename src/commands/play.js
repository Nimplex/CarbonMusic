const search = require('yt-search')
const ytdl = require('ytdl-core')

exports.execute = async(client, message, args) => {
  if(!message.member.voice.channel) return message.channel.send(':octagonal_sign: `Please join voice channel first.`')
  if(message.guild.me.voice.channel && message.member.voice.channelID !== message.guild.me.voice.channelID) return message.channel.send(':octagonal_sign: `Please join to our voice channel first.`')
  const connection = await message.member.voice.channel.join()
  message.guild.me.voice.setSelfDeaf(true)
  if(!args[0]) return message.channel.send(':octagonal_sign: `Please provide valid arguments.`')
      const next = async(url) => {
        const info = await ytdl.getBasicInfo(url)
        if(client.cache[message.guild.id].dispatcher) {
          client.cache[message.guild.id].queue.push({ url: url, info: info })
          message.channel.send(`:musical_note: \`Added ${info.title} to queue.\``)
          return
        }
        let dispatcher = connection.play(ytdl(url, { filter: 'audioonly' }))
        dispatcher.song = info
        client.cache[message.guild.id].connection = connection
        client.cache[message.guild.id].dispatcher = dispatcher
        if(!client.cache[message.guild.id].queue) client.cache[message.guild.id].queue = []
        message.channel.send(`:musical_note: \`Playing ${info.title}\``)
        dispatcher.on('finish', () => {
          if(client.cache[message.guild.id].loop == true) {
            message.channel.send(`:musical_note: \`Playing ${info.title}\``)
            client.cache[message.guild.id].connection.play(ytdl(url, { filter: 'audioonly' }))
            client.cache[message.guild.id].dispatcher.song = info
            return
          }
          if(client.cache[message.guild.id].queue.length > 0) {
            client.cache[message.guild.id].connection.play(ytdl(client.cache[message.guild.id].queue[0].url, { filter: 'audioonly' }))
            message.channel.send(`:musical_note: \`Playing ${client.cache[message.guild.id].queue[0].info.title}\``)
            client.cache[message.guild.id].dispatcher.song = client.cache[message.guild.id].queue[0].info
            client.cache[message.guild.id].queue.shift()
          } else {
            message.channel.send(`:ok_hand: \`Queue/song has been finished, destroyed voice stream.\``)
            delete client.cache[message.guild.id]
            message.guild.me.voice.channel.leave()
          }
        })
      }
  const validate = await ytdl.validateURL(args[0])
  message.channel.send(':mag: `Searching song, please wait...`')
  if(!validate) await search(args.join(' '), async(err, res) => {
      next(res.videos[0].url)
      return
  })
  else next(args[0])
}

exports.info = {
  triggers: ['p', 'play'],
  description: 'Start music stream on your voice channel!',
  usage: ' <url for supported platform or song name>'
}

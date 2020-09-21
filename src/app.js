require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

const prefix = '.'
const files = fs.readdirSync(__dirname + '/commands')
client.cache = {}
client.commands = new Discord.Collection()
files.forEach(element => {
  const command = require(`./commands/${element}`)
  command.info.triggers.forEach(trigger => client.commands.set(trigger, command))
  console.log(element)
})

client.once('ready', () => { console.log(`${client.user.tag} is ready.`); client.user.setPresence({ activity: { name: `${prefix}`, type: 'LISTENING' }, status: 'idle' }) })
client.on('message', async(message) => {
  if(!message.guild || message.author.bot || !message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase() 
  if(!client.commands.has(command)) return
  if(!client.cache[message.guild.id]) client.cache[message.guild.id] = {}
  try {
    client.commands.get(command).execute(client, message, args)
  } catch(err) {
    console.error(err)
  }
})

client.login(process.env.token)
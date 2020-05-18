require("dotenv").config();
const {
    checkCommand,
    computerChoice,
    getResText
} = require ('./components/rps')

const VkBot = require('node-vk-bot-api')
 
const bot = new VkBot(process.env.TOKEN)
 
bot.command('/start', (ctx) => {
  ctx.reply('bye')
})
bot.command('/RPS', (ctx) => {
    ctx.reply('Let\'s start!')
  })

bot.on((ctx) => {
    console.log(ctx);
    if(!checkCommand(ctx.message.body)){
        ctx.reply('I don\'t understand')
    }
    var computerElement = computerChoice()
    var res = computerElement.compare(ctx.message.body)
    
    ctx.reply(`${computerElement.className}
    ${getResText(res)}`)
  })

 
bot.startPolling()
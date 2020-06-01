require("dotenv").config();
const {
  checkCommand,
  computerChoice,
  getResText
} = require('./components/rps')

const VkBot = require('node-vk-bot-api')

const Markup = require('node-vk-bot-api/lib/markup')
const Scene = require('node-vk-bot-api/lib/scene')
const Session = require('node-vk-bot-api/lib/session')
const Stage = require('node-vk-bot-api/lib/stage')
const {
  choice,
  // getResText,
  compare
} = require('./components/dice')

const bot = new VkBot(process.env.TOKEN)

bot.command('/start', (ctx) => {
  ctx.reply('bye')
})

bot.command('/RPS', (ctx) => {
  ctx.reply('Make your choice', null, Markup
    .keyboard([
      'rock',
      'paper',
      'scissors'
    ])
    .oneTime());
});


const session = new Session()

bot.use(session.middleware())

// Кости
bot.command('/dice', (ctx) => {
  const userDice = choice();
  const computerDice = choice();
  const res = compare(userDice, computerDice);

  // choice,
  // getResText,
  // compare

  ctx.reply(`your dice: ${userDice}
  opponents dice: ${computerDice}
  result: ${getResText(res)}`)
})
//Tick Tack Toe

bot.command('/ttt',(ctx)=>{
  const gameEl = ['-','-','X','0','-','0','-','-','X']
  const gameElArr = gameEl.map((elem, index)=>{
    return Markup.button(elem, 'primary', {index})
  })
  ctx.reply('How are you doing?', null, Markup
  .keyboard(
    gameElArr, {columns: 3}

  ).oneTime(), 
)
})
bot.on((ctx) => {
  console.log(ctx.message.payload)
  const text = ctx.message.body || ctx.message.text
  if (!checkCommand(text)) {
    ctx.reply('I don\'t understand')
    return
  }
  ctx.session.score = ctx.session.score || 0
 
  let computerElement = computerChoice()
  let res = computerElement.compare(text)
  ctx.session.score += res
  console.log(ctx.session.score);
  const goal = 2
  if (ctx.session.score === goal) {
    ctx.session.score = 0
    ctx.reply(`${computerElement.className}
  ${getResText(res)}
  You are total Winner`);

  } else if (ctx.session.score === -goal) {
    ctx.session.score = 0
    ctx.reply(`${computerElement.className}
  ${getResText(res)}
  You are total Loser`);
  }

  ctx.reply(`${computerElement.className}
  ${getResText(res)}`, null, Markup
    .keyboard([
      'rock',
      'paper',
      'scissors'
    ])
    .oneTime());
})


bot.startPolling()



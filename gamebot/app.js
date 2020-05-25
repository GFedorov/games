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
  ctx.reply('Make your choice')
})

/*
bot.command('/sport', (ctx) => {
  ctx.reply('Select your sport', null, Markup
    .keyboard([
      'Football',
      'Basketball',
    ])
    .oneTime());
});

bot.command('/mood', (ctx) => {
  ctx.reply('How are you doing?', null, Markup
    .keyboard([
      [
        Markup.button('Normally', 'primary'),
      ],
      [
        Markup.button('Fine', 'positive'),
        Markup.button('Bad', 'negative'),
      ],
    ]));
});
const scene = new Scene('meet',
  (ctx) => {
    ctx.scene.next()
    ctx.reply('How old are you?')
  },
  (ctx) => {
    ctx.session.age = +ctx.message.text

    ctx.scene.next()
    ctx.reply('What is your name?')
  },
  (ctx) => {
    ctx.session.name = ctx.message.text

    ctx.scene.leave()
    ctx.reply(`Nice to meet you, ${ctx.session.name} (${ctx.session.age} years old)`)
  },
)
const session = new Session()
const stage = new Stage(scene)

bot.use(session.middleware())
bot.use(stage.middleware())

bot.command('/meet', (ctx) => {
  ctx.scene.enter('meet')
})
*/

bot.command('/dice', (ctx) => {
 const userDice = choice();
 const computerDice = choice();
 const res = compare(userDice,computerDice);
 
  // choice,
  // getResText,
  // compare

  ctx.reply(`your dice: ${userDice}
  opponents dice: ${computerDice}
  result: ${getResText(res)}`)
})

bot.on((ctx) => {
  console.log(ctx);
  if (!checkCommand(ctx.message.body)) {
    ctx.reply('I don\'t understand')
  }
  var computerElement = computerChoice()
  var res = computerElement.compare(ctx.message.body)

  ctx.reply(`${computerElement.className}
    ${getResText(res)}`)
})


bot.startPolling()
require("dotenv").config();
require('./models/db');
const User = require('./models/User');
const Step = require("./models/Step")
const {
  checkCommand,
  computerChoice,
  getResText
} = require('./components/rps')
const tttController = require('./controllers/ttt')

const VkBot = require('node-vk-bot-api')

const Markup = require('node-vk-bot-api/lib/markup')
const Scene = require('node-vk-bot-api/lib/scene')
const Session = require('node-vk-bot-api/lib/session')
const Stage = require('node-vk-bot-api/lib/stage')
const TTT = require("./components/ttt")

const {
  choice,
  // getResText,
  compare
} = require('./components/dice');
const { choose } = require("./controllers/ttt");
const ttt = require("./controllers/ttt");

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
const startTTT = async (ctx) => {
  let user  = await User.getByUserId(ctx.message.from_id)
  if (!user){
    const response = await bot.execute('users.get', {
      user_ids: ctx.message.from_id,
      fields: 'photo_50',
    });
    const userFields = response[0]
    user = await User.create({
      ...userFields,
      user_id: userFields.id
    })
  }
  ctx.session.gameId = ctx.message.from_id+'_' + Date.now();
  
  ctx.session.gameEl = ['-', '-', '-', '-', '-', '-', '-', '-', '-']
  const gameEl = ctx.session.gameEl;
  const gameElArr = gameEl.map((elem, index) => {
    return Markup.button(elem, 'primary', { index, game: 'ttt' })
  })
  ctx.reply('Let\'s play', null, Markup
    .keyboard(
      gameElArr, { columns: 3 }

    ).oneTime(),
  )
}
bot.command('/tttOnline', tttController.online)
bot.command('/ttt', startTTT);
bot.on(async (ctx) => {
  if (ctx.message.payload) {
    const payload = JSON.parse(ctx.message.payload);
    if (payload.game == 'ttt') {
      if(payload.action = choose){
        return await tttController.choose(ctx)
      }
      if (payload.index == -1) {
        await startTTT(ctx);
        return
      }
      const gameEl = ctx.session.gameEl;
      let gameEnd = false;
      const res = TTT.firstPlayerTurn(payload.index, gameEl);
      const stepFields = {scene: res.data,
        player: ctx.message.from_id,
        game_id: ctx.session.gameId};

      if (res.success) {
        if (TTT.isWinner(res.data, 'X')) {
          stepFields.result = Step.RESULT_WIN;
          gameEnd = 'X';
          ctx.session.gameEl = null;
        }
        const secData = TTT.secPlayerTurn(res.data);
        if (!gameEnd && TTT.isWinner(secData, '0')) {
          stepFields.result = Step.RESULT_LOSE;
          ctx.session.gameEl = null;
          gameEnd = '0';
        }
        Step.create(stepFields)
        if (!gameEnd) {
          const gameElArr = secData.map((elem, index) => {

            return Markup.button(elem, 'primary', { index, game: 'ttt' })
          })


          ctx.session.gameEl = secData;
          ctx.reply('Your turn', null, Markup
            .keyboard(
              gameElArr, { columns: 3 }

            ).oneTime(),
          )
          return;

        } else {
          const gameElArr = (gameEnd == 'X' ? res.data : secData).map((elem, index) => {

            return Markup.button(elem, 'primary', { index: -1, game: 'ttt' })
          })
          ctx.reply(gameEnd == 'X' ? 'You WON' : 'You LOSE', null, Markup
            .keyboard(
              gameElArr, { columns: 3 }

            ).oneTime(),
          )
          return
        }

      } else {
        ctx.reply(res.message)
        return;
      }
    }
  }
  // console.log(ctx.message.payload)
  // console.log(ctx.message.payload['game'])
  // console.log(typeof ctx.message.payload)

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



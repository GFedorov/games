const Markup = require('node-vk-bot-api/lib/markup')
const User = require('../models/User')
const makeVkBtn = el => {
    return Markup.button(el.name, 'primary', { game: 'ttt', ...el.data })
}
const online = async ctx => {
    const users = await User.list()
    console.log(users)
    const userBtns = []
    for (let user of users) {
        if (ctx.message.from_id != user.user_id) {


            userBtns.push({
                name: `${user.first_name} ${user.last_name}`,
                data: { user_id: user.user_id, action: 'choose' }
            })
        }
    }
    const vkBtns = userBtns.map(makeVkBtn)
    ctx.reply('hello', null, Markup
        .keyboard(
            vkBtns, { columns: 1 }

        ).oneTime())
}

const getData = (ctx)=>{
    const {
        message
    } = ctx
    const {
        from_id,
        payload
    } = message
    const parsed = JSON.parse(payload)
    return {...parsed, from_id}
}
const choose = async (bot, ctx) => {

    const {
        message
    } = ctx
    const {
        from_id,
        payload
    } = message
    const to_id = JSON.parse(payload).user_id
    bot.sendMessage(from_id, `Приглашение отправлено пользователю ${to_id}`)

    console.log(from_id, to_id)
    const btns = [];
    btns.push({
        name: `Да`,
        data: { user_id: from_id, action: 'confirm' }

    })
    btns.push({
        name: `Нет`,
        data: { user_id: from_id, action: 'decline' }
        
    })
    const vkBtns = btns.map(makeVkBtn)
    bot.sendMessage(to_id, `Пользователь ${from_id} приглашает сыграть в крестики-нолики`, null, Markup
        .keyboard(
            vkBtns, { columns: 2 }
        ).oneTime())

}

const decline = async (bot, ctx)=>{

    const {
        from_id,
        user_id
    } = getData(ctx)

    bot.sendMessage(user_id, `Пользователь ${from_id} отклонил приглашение`)
}

const confirm = async (bot, ctx)=>{

    const {
        from_id,
        user_id
    } = getData(ctx)

    bot.sendMessage(user_id, `Пользователь ${from_id} принял приглашение`)

    const users = [from_id, user_id];
    const randomIndex = Math.floor(Math.random() * users.length);
    const firstPlayerId = users[randomIndex];
    const secPlayerId = users.find(userId => userId != firstPlayerId)

    bot.sendMessage(firstPlayerId, `Вы ходите крестиками`);
    bot.sendMessage(secPlayerId, `Первым ходит игрок ${firstPlayerId}`)
    
}


module.exports = {
    online,
    choose,
    decline,
    confirm
}

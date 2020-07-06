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
                data: { user_id: user.user_id , action: 'choose'}
            })
        }
    }
    const vkBtns = userBtns.map(makeVkBtn)
    ctx.reply('hello', null, Markup
        .keyboard(
            vkBtns, { columns: 1 }

        ).oneTime())
}
const choose = async ctx => {
    console.log(ctx)
    ctx.reply('ok')
}
module.exports = {
    online,
    choose
}

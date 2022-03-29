const {Scenes, Composer, Markup} = require('telegraf')
const User = require('../user')

const stepOne = new Composer()
stepOne.action('deleteDataWizard', ctx =>{
    ctx.reply('Введите Имя:')
    
    ctx.wizard.state.data = {}
    ctx.wizard.next()
})

const stepThree = new Composer()
stepThree.on('text', async ctx =>{
    const fnm = ctx.message.text
    

    User.find({firstName: fnm}, async (err, users) =>{
        if (err){
            await ctx.reply('Возникла ошибка')
            throw err
        }
        let usersKeyBoard = []
        users.forEach(user =>{
                usersKeyBoard.push([Markup.button.callback(`${user.firstName} ${user.lastName}`, user._id)])
        })
        await ctx.reply('Выберите пользователя:', Markup.inlineKeyboard(usersKeyBoard))
    })
    
    return ctx.wizard.next()
})

const stepFinal = new Composer()
stepFinal.on('callback_query', ctx=>{
    User.findByIdAndDelete(ctx.callbackQuery.data , (err, res) =>{
        if (err) throw err
        ctx.reply(`пользователь ${res.lastName} ${res.firstName} удален`)
    })
    ctx.scene.leave()
})

const deleteDataWizard = new Scenes.WizardScene('deleteDataWizard', stepOne, stepThree, stepFinal)

module.exports = deleteDataWizard
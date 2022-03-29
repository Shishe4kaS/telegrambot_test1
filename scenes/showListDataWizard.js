const {Scenes, Composer} = require('telegraf')
const User = require('../user')


const stepOne = new Composer()

stepOne.action('showListDataWizard', async ctx=>{
    User.find({}, (err, users) =>{
        if (err){
            ctx.reply('Возникла ошибка')
            throw err
        }
        ctx.reply('идет обработка')
        users.forEach(user =>{
            ctx.replyWithHTML(`${user.firstName}\n${user.lastName}`)
        })
    })
    return ctx.scene.leave()
})

const showListDataWizard = new Scenes.WizardScene('showListDataWizard', stepOne)

module.exports = showListDataWizard;
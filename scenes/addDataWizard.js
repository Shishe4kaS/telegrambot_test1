const {Scenes, Composer} = require('telegraf')
const mongoose = require('mongoose')
const User = require('../user')

const startScene = new Composer()
startScene.action('addDataWizard',async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply('Введите имя: ')
    return ctx.wizard.next()
})

const firstNameScene = new Composer()
firstNameScene.on('text', async ctx =>{
    
    await ctx.reply('Введите фамилию: ')
    return ctx.wizard.next()
})

const lastNameScene = new Composer()
lastNameScene.on('text', async ctx =>{
    ctx.wizard.state.data.lastName = ctx.message.text

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: ctx.wizard.state.data.firstName,
        lastName: ctx.wizard.state.data.lastName
    })

    user.save(async err => {
        if (err){
            await ctx.reply('Произошла ошибка')
            throw err
        } 
        else await ctx.reply('Запись прошла успешно')
    })

    return ctx.scene.leave()
})

module.exports = new Scenes.WizardScene("addDataWizard", startScene, firstNameScene, lastNameScene)
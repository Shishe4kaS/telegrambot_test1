const { Telegraf, Scenes, session, Markup } = require("telegraf")
const mongoose = require('mongoose')
require('dotenv').config()

const addDataWizard = require("./scenes/addDataWizard")
const showListDataWizard = require('./scenes/showListDataWizard')
const deleteDataWizard = require("./scenes/deleteDataWizard")

mongoose.connect(process.env.URI_DB, err => {
    if (err) throw er
    console.log('succes!')
})

const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)

const stage = new Scenes.Stage([addDataWizard, showListDataWizard, deleteDataWizard])

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx=>{
    
    ctx.reply('Меню', Markup.inlineKeyboard([
        [Markup.button.callback('Добавить пользователя', 'addDataWizard')], 
        [Markup.button.callback('Показать список записей', 'showListDataWizard')],
        [Markup.button.callback('Удалить пользователя', 'deleteDataWizard')]
    ]))
})
bot.action('addDataWizard', async ctx=>{
    await ctx.scene.enter('addDataWizard')
})
bot.action('showListDataWizard', async ctx => {
    await ctx.scene.enter('showListDataWizard')
})
bot.action('deleteDataWizard', async ctx => {
    await ctx.scene.enter('deleteDataWizard')
})

bot.launch()


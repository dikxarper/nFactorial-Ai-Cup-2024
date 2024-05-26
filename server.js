const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
require("dotenv").config({path: "config/.env"})
app.set('views', path.join(__dirname, 'views'))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('layout', 'layouts/layout')
app.use('/views', express.static(path.join(__dirname + '/views')))
const bot = require('./bot/bot')

app.use('/public', express.static(path.join(__dirname + '/public')))
app.use(express.json())
app.use(expressLayouts)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
const index = require('./routes/renderRoute')
const authRoute = require('./routes/authRoute')
const sourceRoute = require('./routes/sourceRoute')
const companyRoute = require('./routes/companyRoute')

app.use('/', index)
app.use('/api/auth', authRoute)
app.use('/api/source', sourceRoute)
app.use('/api/company', companyRoute)

app.use((req, res, next) => {
    res.status(404).render('errors/error-404')
})

app.use((req, res, next) => {
    res.status(500).render('errors/error-500')
})

const Company = require('./models/company-model')

bot.setMyCommands([
    {
        command: '/start',
        description: 'Start bot'
    },
    {
        command: '/info',
        description: 'Information about project'
    },
    {
        command: '/getchatbot',
        description: 'Get chat bot'
    },
    {
        command: '/link',
        description: 'Link to website'
    },
    {
        command: '/test',
        description: 'test'
    }
])


bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/start') {
        return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}!`)
    }
    if (text === '/link') {
        return bot.sendMessage(chatId, 'Ссылка на сайт')
    }
    if (text === '/test') {
        return bot.sendMessage(chatId, `${msg}`)
    }
    if (text === '/info') {
        return bot.sendMessage(chatId, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
            'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
            'aliquip ex ea commodo consequat. Duis aute irure' +
            ' dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
            'sunt in culpa qui officia deserunt mollit anim id est laborum.')
    }
    if (text === '/getchatbot') {
        await bot.sendMessage(chatId, 'Отправьте токен')
        bot.once('message', async (msg) => {
            const token = msg.text.trim()

            try {
                const company = await Company.find({telegramToken: token})
                if (!company) return bot.sendMessage(chatId, "Токен не найден")
                return bot.sendMessage(chatId, `Добро пожаловать ${msg.from.first_name}!`)
            } catch (err) {
                return bot.sendMessage(chatId, "Ошибка")
            }
        })
    }
})

const DB = require('./db')

DB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.error('Failed to connect to database:', err.message)
    })

module.exports = app

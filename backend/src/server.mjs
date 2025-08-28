import express from 'express'
import dotenv from 'dotenv'

const App = express()
const BaseURL = 'v1'

dotenv.config()

App.get(`/${BaseURL}/`, (req, res) => {
    res.send({ color: `#${Math.floor(Math.random() * 16777215).toString(16)}` })
})

App.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
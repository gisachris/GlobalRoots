import express from 'express'
import dotenv from 'dotenv'

const App = express()

dotenv.config()

App.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
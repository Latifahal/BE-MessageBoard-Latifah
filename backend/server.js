import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import requestLogger from './middleware/requestLogger.js'
import messageRouter from './routes/messageRouter.js'
import checkPass from './middleware/checkPass.js'

//init express app
const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)
//todo: add password checking
dotenv.config()
console.log(process.env.API_KEY)

//add endpoints
app.use("/messages", messageRouter)
app.use((req, res) => res.sendStatus(404))
app.use((err, req, res, next) => {
    console.error(err)
                        // res.sendStatus(500)
                        //to reveal why the error is happening for the user we can use the 2 lines of code below.
   res.status(500)
   res.send({ error: err.message })
})

//start listening
const port = process.env.PORT
app.listen(4000, () => console.log(`Up at http://localhost:${port}`))
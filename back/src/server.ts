import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'
import RunOnServerStartup from './config/RunOnServerStartup'

const app = express()
const corsOptions = {
    origin: process.env.FRONTEND_URL,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(routes)

app.use(errorHandler as unknown as express.ErrorRequestHandler)

async function initialize() {
    try {
        const onServerStartup = new RunOnServerStartup()
        await onServerStartup.createFirstUserIfServerIsEmpty()
    } catch (error) {
        console.error('❌ Error running startup functions:', error)
    }
}
initialize()

app.listen(process.env.BACK_PORT || 3333, () => {
    console.log(`Server started on port ${process.env.BACK_PORT || 3333}!`)
})

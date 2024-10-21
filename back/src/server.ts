import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(express.json())
app.use(routes)

app.use(errorHandler as unknown as express.ErrorRequestHandler)

app.listen(process.env.PORT || 3333, () => {
    console.log(`Server started on port ${process.env.PORT || 3333}!`)
})

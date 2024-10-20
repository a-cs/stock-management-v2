import 'dotenv/config'
import express from 'express'

const app = express()

app.use(express.json())

app.post('/users', (req, res) => {
    console.log(req.body)
    res.send('Ok')
})

app.listen(process.env.PORT || 3333, () => {
    console.log(`Server started on port ${process.env.PORT || 3333}!`)
})

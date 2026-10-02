import express from 'express'
import router from './routes/route.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Rodando servidor.')
})

app.use('/emprestimos', router)

export default app
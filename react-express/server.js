const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    cors = require('cors')

const connection = require('./utils/db')

app.use(cors())
// app.use((requset, response, next) => {
//     console.log(`第二個`)
//     next()
// })

app.get('/', (request, response, next) => {
    response.send({ message: 'Homepage~' })
})
app.get('/product', async (request, response) => {
    let result = await connection.queryAsync('SELECT * FROM product')
    console.log(result)
    response.json(result)
})
app.listen(port, () => {
    console.log('Backend server live on ' + port)
})

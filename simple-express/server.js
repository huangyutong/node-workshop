const { response } = require('express')
const express = require('express')

// 利用 express 建立了一個 express application
let app = express()

app.use((req, res, next) => {
    let dt = new Date()
    response.send(`cat ${dt}`)
    // console.log('cat')
    next()
})
app.use((req, res, next) => {
    let dt = new Date()
    response.send(`dog${dt}`)
    // console.log('dog')
    next()
})
// HTTP Method: get, post, put, patch, delete
app.get('/', function (request, response, next) {
    response.send('Hello~~')
})

app.listen(3001, function () {
    console.log('我們的 web server 啟動了～')
})

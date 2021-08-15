const { response } = require('express')
const express = require('express')

// 利用 express 建立了一個 express application
let app = express()

//中間件
app.use((req, res, next) => {
    let dt = new Date()
    console.log(`cat${dt}`)
    next()
})
app.use((req, res, next) => {
    let dt = new Date()
    console.log(`dog${dt}`)
    next()
})
//route路由
// HTTP Method: get, post, put, patch, delete
app.get('/', function (request, response, next) {
    response.send('Hello~~')
})

//stock GET API

app.get('/about', function (request, response, next) {
    response.send('About')
})

app.listen(3000, function () {
    console.log('我們的 web server 啟動了～')
})

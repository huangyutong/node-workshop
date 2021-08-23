const express = require('express')
const connection = require('./utils/db')

// 利用 express 建立了一個 express application
let app = express()

//中間件
//app.use(handler)
// app.use((request, response, next) => {
//     let dt = new Date()
//     console.log(`cat${dt}`)
//     next()
// })
app.use((request, response, next) => {
    let current = new Date()
    console.log(`有人來訪問囉 at ${current.toISOString()}`)
    next() //一定要寫next否則會卡住
})
app.use((requset, response, next) => {
    console.log(`第二個`)
    next()
})
//route路由
// HTTP Method: get, post, put, patch, delete
app.get('/', function (request, response, next) {
    response.send('Hello~~')
})

app.get('/about', function (request, response, next) {
    response.send('About')
})

//stock GET API
// /stock/2330 ===>stockCode = 2330
app.get('/stock', async (request, response, next) => {
    let result = await connection.queryAsync('SELECT * FROM stock')
    // console.log(result)
    response.json(result)
})

//只想取得單一資料
app.get('/stock/:stockCode', async (request, response, next) => {
    let result = (await connection.queryAsync('SELECT * FROM stock_price WHERE stock_id=?', [request.params.stockCode])(
        // console.log('456')
        // response.json(result)
        result.length == 0
    ))
        ? response.redirect(404, '/stock')
        : response.json(result)
})

//404(中間件)
app.use((request, response, next) => {
    response.status(404).json({ message: 'Not Found!!' })
})

app.listen(3000, async function () {
    //因為改成pool->不需要connect手動連線
    // await connection.connectAsync();
    console.log('我們的 web server 啟動了～')
})

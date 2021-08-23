const http = require('http')
//web sever
//apache
//client-->http request-->server
//      <--http response<--sevrer
const server = http.createServer((req, res) => {
    let url = req.url

    switch (url) {
        case '/':
            res.end('Hello simple tab')
            break
        case '/about':
            res.end('<h1>About US</h1>')
            break
    }
})
server.listen(3000, () => {
    console.log('我們web server 啟動了')
})

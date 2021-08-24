const mysql = require('mysql')
require('dotenv').config()
const Promise = require('bluebird') //promise化

//沒有await->下面就是promise
let connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.CONNECTION_LIMIT || 10, // ||->或的意思前面沒有的話就執行後面的
})
connection = Promise.promisifyAll(connection)
// connection.connectAsync() //自動回傳 加上Async->promise版 不加->cb版
module.exports = connection

// module.exports = connection
//module.exports->new connection(直接指向新的)
//外部使用：const connection =require(); connection.query

// module.exports.connection = connection
//未來可以做新增其他物件 module.exports->old connection->new connection
//外部使用：const db =require(); db.connection

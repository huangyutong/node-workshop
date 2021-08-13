const axios = require('axios')
const moment = require('moment')
const fs = require('fs')
const mysql = require('mysql')
require('dotenv').config()

//設定連線port 預設3306
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
//準備連線
connection.connect((err) => {
    if (err) {
        console.log('資料庫連不上')
    } else {
        console.log('已成功')
    }
})

// console.log(moment().format = ("YYYYMMDD"))
//讀資料庫,是否符合
function readStockPromise() {
    return new Promise((resolve, reject) => {
        fs.readFile('stock.txt', 'utf8', (err, stockCode) => {
            if (err) {
                reject('error', err)
            } else {
                resolve(stockCode.trim())
            }
        })
    })
}

//去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內.基於安全性不會用"stockCode"傳入資料而是[stockCode]
function queryStockPromise(stockCode) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM stock WHERE stock_id=?', [stockCode], function (error, results, fields) {
            if (error) {
                reject(error)
            }
            resolve(results)
        })
    })
}

//抓資料
function axiosStock(stockNo) {
    return axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
        params: {
            response: 'json',
            date: moment().format('YYYYMMDD'),
            stockNo: stockNo,
        },
    })
}

//寫入資料庫,要傳入parsedData
function insertPromise(itemData) {
    return new Promise((parsedData) => {
        connection.query(
            'INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?',
            [itemData],
            function (error, results, fields) {
                if (error) reject(error)
                resolve(results)
            }
        )
    })
}
//0.準備連線
//1.讀股票代碼
//2.去讀資料庫查看是否符合
//3.如果符合才axios去抓資料
//4.將資料存回資料庫
async function homework() {
    try {
        //1
        let stockCode = await readStockPromise()

        //2
        let doResult = await queryStockPromise(stockCode)

        if (doResult.length === 0) {
            reject('此股票不在服務範圍內')
        }
        console.info('在資料庫有查到資料')
        //3
        // stockCode.trim() -> 移除前後空白字元, 包括換行
        let response = await axiosStock(stockCode)

        const twseData = response.data
        if (twseData.stat !== 'OK') {
            throw '從證交所從證交所查詢的資料有問題'
        }
        let dataItem = twseData.data.map((item) => {
            // console.log(dataItem)
            // 拿掉日期斜線
            item = item.map((val) => {
                return val.replace(/,/g, '')
            })
            // 轉西元年,將字串轉數字才能加減乘除,parseInt轉數字
            item[0] = parseInt(item[0].replace(/\//g, ''), 10) + 19110000

            // 把stock_id放進去
            item.unshift(stockCode)
            return item
        })
        console.log(dataItem)
        //4
        let insertData = await insertPromise(dataItem)
        console.log(insertData)
    } catch (error) {
        console.error('error', error)
    } finally {
        // 不管成功或失敗都要加上關閉，不關閉程式會一直執行
        connection.end()
    }
}
homework()

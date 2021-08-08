const axios = require("axios");
const moment = require("moment")
const fs = require("fs")
const mysql = require("mysql")
require('dotenv').config();


// console.log(moment().format = ("YYYYMMDD"))
function promiseStock() {
    return new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, stockCode) => {
            if (err) {
                reject("error", err)
            } else {
                resolve(stockCode)
            }
        });

    })
};
//port 預設3306
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
connection.connect((err) => {
    if (err) {
        console.log("資料庫連不上")
    } else {
        // console.log("已成功")
    }
});

//不關閉程式會一直執行
connection.end();


// function axiosStock(stockNo) {
//     return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//         params: {
//             response: "json",
//             date: moment().format("YYYYMMDD"),
//             stockNo: stockNo,
//         }
//     });
// };

// async function homework() {
//     try {
//         let stockCode = await promiseStock();
//         // let response = await axiosStock(stockCode.trim());
//         //stockCode.trim() ->移除前後空白字元,包括換行
//         console.log(response.data.title);
//     } catch (error) {
//         console.error("error", error);
//     }
// }
// homework();

// const axios = require("axios");
// const moment = require("moment")
// const fs = require("fs")

// // console.log(moment().format = ("YYYYMMDD"))
// let promiseStock = function () {
//     return new Promise((resolve, reject) => {
//         fs.readFile("/crawler/stock.txt", "utf8", (err, stockCode) => {
//             if (err) {
//                 reject("error", err)
//             } else {
//                 resolve(stockCode)
//             }
//         });

//     })
// }
// let axiosStock = function (stockCode) {
//     return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY?", {
//         params: {
//             response: "json",
//             date: moment().format("YYYYMMDD"),
//             stockNo: stockCode,
//         }
//     });
// };

// async function homework() {
//     try {
//         let stockCode = await promiseStock();
//         let response = await axiosStock(stockCode);
//         console.log(response.data.title);
//     } catch (error) {
//         console.log("error", error);
//     }
// }
// homework();


const axios = require("axios");
const moment = require("moment")
const fs = require("fs")

// console.log(moment().format = ("YYYYMMDD"))
let promiseStock = function () {
    return new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, stockCode) => {
            if (err) {
                reject("error", err)
            } else {
                resolve(stockCode)
            }
        });

    })
}
let axiosStock = function (stockNo) {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: stockNo,
        }
    });
};

async function homework() {
    try {
        let stockCode = await promiseStock();
        let response = await axiosStock(stockCode.trim());
        console.log(response.data.title);
    } catch (error) {
        console.log("error", error);
    }

}
homework();

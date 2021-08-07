const axios = require("axios");
const moment = require("moment")
const fs = require("fs")

// console.log(moment().format = ("YYYYMMDD"))

let stockCode = 0;
new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stockCode) => {
        if (err) {
            reject("error", err)
        } else {
            resolve(stockCode)
        }
    })
        .then((stockCode) => {
            return axios
                .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY?", {
                    params: {
                        response: "json",
                        date: moment().format("YYYYMMDD"),
                        stockNo: stockCode,
                    },
                })
        })
        .then((response) => {
            console.log(response.data.title);
        })
        .catch((error => {
            console.log("error")
        }))
})


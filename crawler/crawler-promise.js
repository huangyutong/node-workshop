const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

let stockCode = "";
new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf-8", (err, stockCode) => {
        if (err) {
            reject(err);
        } else {
            resolve(stockCode);
        }
    });
})
    .then((stockNo) => {
        return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY?", {
            params: {
                response: JSON,
                date: moment().format("YYYYMMDD"),
                stockNo: stockNo,
            },
        });
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });

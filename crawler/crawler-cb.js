
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

// console.log(moment().format = ("YYYYMMDD"))

// fs.readFile("stock.txt", "utf8", (err, stockCode) => {
//     if (err) {
//         console.log(err);
//     } else {
//         axios
//             .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//                 params: {
//                     response: "json",
//                     date: moment().format("YYYYMMDD"),
//                     stockNo: stockCode,
//                 },
//             })
//             .then((response) => {
//                 console.log(response.data.title);
//             })
//     }
// })


fs.readFile("stock.txt", "utf8", (err, stockCode) => {
    if (err) {
        console.error(err);
    } else {
        axios
            .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
                params: {
                    response: "json",
                    date: moment().format("YYYYMMDD"),
                    stockNo: stockCode, 
                },
            })
            .then((response) => {
                console.log(response.data.title);
            });
    }
});

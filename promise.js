let doWork = function (job, timer, cb) {
    return new Promise(function (resolve, reject) {

        setTimeout(() => {
            let dt = new Date();
            if (ok) {
                resolve(`完成事情： ${job} at ${dt.toISOString()}`)
            } else {
                reject(`失敗事情： ${job}`)
            }
        }, timer);

    });
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`)

let job1 = doWork("刷牙", 3000, false);
// let job2 = doWork("吃早餐", 5000, true);
// let job3 = doWork("做作業", 8000, true);
console.log(job1);
// console.log(job2);
// console.log(job3);

job1.then(
    function (resolve) {
        // 負責接受 resolve (成功)
        console.log("第 1 個函式被呼叫了", resolve);
    },
    function (reject) {
        // 負責接受 reject (失敗)
        console.log("第 2 個函式被呼叫了", reject);
    }

);
// job2.then(
//     function (resolve) {
//         // 負責接受 resolve (成功)
//         console.log("第一個函式被呼叫了", resolve);
//     },
//     function (reject) {
//         // 負責接受 reject (失敗)
//         console.log("第一個函式被呼叫了", reject);
//     }
// );
// job3.then(
//     function (resolve) {
//         // 負責接受 resolve (成功)
//         console.log("第一個函式被呼叫了", resolve);
//     },
//     function (reject) {
//         // 負責接受 reject (失敗)
//         console.log("第一個函式被呼叫了", reject);
//     }
// );

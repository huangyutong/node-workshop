// Promise 是一個表示非同步運算的「最終」完成或失敗的物件。
//   最終成功
//   最終失敗
//   new Promise

let doWork = function (job, timer, ok) {
    return new Promise(function (resolve, reject) {
        // 模擬一個非同步工作
        console.log("in promise");
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

//刷牙->吃早餐->寫作業->吃午餐
let job1 = doWork("刷牙", 3000, true);
console.log(job1);

job1
    .then((result) => {
        // 負責接受 resolve (成功)
        console.log("第 1 個函式被呼叫了", result);
        return doWork("吃早餐", 5000, true)
        // 即使我們回傳的是數字，還是會包成 promise 物件
    })
    .then((result) => {
        console.log("第 2 個函式被呼叫了", result);
        return doWork("寫作業", 6000, true)
    })
    .then((result) => {
        console.log("第 3 個函式被呼叫了", result);
        return doWork("吃午餐", 3000, true)
    })

    //捕捉錯誤
    .catch((error) => {
        console.log("第 2 個函式被呼叫了", error);
    })
    .finally(() => {
        console.log("finally");
    })




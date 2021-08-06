// await / async 基於 promise 的語法糖
// 使用 await / async -> 改善promise chain

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
//await須用async包著
async function wakeUpList() {
    let job1 = await doWork("刷牙", 3000, true);
    console.log(job1);
    let job2 = await doWork("吃早餐", 5000, true);
    console.log(job2);
    let job3 = await doWork("寫作業", 6000, true);
    console.log(job3);
    let job4 = await doWork("吃午餐", 3000, true);
    console.log(job4);
}
wakeUpList();

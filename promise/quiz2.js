//Ans:4-1-5-2-3
//依順序console.log(4)->asyncF()
//進入function,console.log(1),console.log(2)要等一下才繼續進行接下來進行console.log(5
//console.log(5)執行完才回func繼續執行console.log(2)->console.log(3)
async function asyncF() {
    console.log(1);
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            resolve();
        }, 0);
    });
    console.log(3);
}

console.log(4);
asyncF();
console.log(5);


// 請問下列程式碼印出的順序為何？
//Ans:4-1-3-5-2
//先呼叫console.log(4)再來呼叫syncF function
//進入function 第一個遇到的是console.log(1)但因setTimeout非同步被丟到Queue
//再遇到console.log(3)再進行onsole.log(5)等全部stack執行完才執行console.log(2)

function syncF() {
    console.log(1);

    setTimeout(() => {
        console.log(2);
    }, 0);
    console.log(3);
}

console.log(4);
syncF();
console.log(5);

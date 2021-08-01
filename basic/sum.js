//best answer
function sum(n) {
    return ((n + 1) * n / 2)
}
console.log(sum(5))

//my answer
function result(n) {
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }
    return result;
}
console.log(result(10))

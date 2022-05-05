const numOne = "1008381";
// 参数1 Number => 需要填充为长度多少的字符
// 参数2 any => 用什么来填充呢？
// padEnd同理
const newNumOne = String.prototype.padStart.apply(numOne, [10, "0"]);
console.log(newNumOne); // 0001008381

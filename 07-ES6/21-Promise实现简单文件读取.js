// 此案例需要安装node环境来运行这个脚本
const fs = require("fs");

let p = new Promise((resolve, reject) => {
    fs.readFile('./01-let.html', (err, data) => {
        if (err) reject(err)
        resolve(data.toString())
    })
})
p.then((value) => {
    console.log(value)
}, (reason) => {
    console.log(reason)
})
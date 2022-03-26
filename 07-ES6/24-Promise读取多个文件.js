const fs = require("fs");
let p = new Promise((resolve, reject) => {
    fs.readFile('./01-let.html', (err, data) => {
        if (err) reject(err)
        resolve(data.toString())
    })
})
p.then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('./02-const.html', (err, data) => {
            if (err) reject(err)
            resolve([value, data])
        })
    })
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('./03-解构.html', (err, data) => {
            if (err) reject(err)
            value.push(data)
            resolve(value)
        })
    })
}).then(value => {
    console.log(value.toString())
})
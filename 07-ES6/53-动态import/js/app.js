const btn = document.getElementById('app')
btn.onclick = function () {
    import('./m1.js').then(module => {
        // 按需引入 这里相当于懒加载了 需要的时候引用即可
        console.log(module) // 打印模块中的内容
        module.hello()
    })
}
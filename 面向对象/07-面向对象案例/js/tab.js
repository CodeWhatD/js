class Tab {
    constructor(id) {
        this.id = id
        this.main = document.querySelector("#"+id) // 获取主要大模块
        this.lis = this.main.querySelectorAll("li") // 获取所有标签Li
        this.contentList = this.main.querySelector("section") // 获取所有的标签对应内容
    }
    init () {
        for (let i=0;i<this.lis.length;i++){
            this.lis[i].index = i
            this.lis[i].addEventListener("click",function () {
                console.log(this.index)
            })
        }
    }
}

let mainTab = new Tab('tab')
mainTab.init()

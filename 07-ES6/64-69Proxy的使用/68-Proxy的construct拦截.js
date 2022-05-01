const handler = {
	/**
	 * @param {*} target 目标对象
	 * @param {*} args 构造函数的参数数组
	 * @param {*} newTarget 创造实例对象时，new命令作用的构造函数（下面例子的p）
	 */
	construct(target, args, newTarget) {
    console.log("construct")
		return new target(...args)
	},
}

class Person {
	constructor(name) {
		this.name = name
	}
}
const Per = new Proxy(Person, handler)
const p1 = new Per('风间') // 这里触发了 construct拦截
console.log(p1.name)

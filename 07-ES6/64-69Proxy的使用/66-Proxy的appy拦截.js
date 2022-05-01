const fns = (x, y) => {
	return x + y
}

const interProxy = new Proxy(fns, {
	/**
	 *
	 * @param {*} target 目标函数
	 * @param {*} ctx 函数上下文this
	 * @param {*} args 函数的参数
	 */
	apply(target, ctx, args) {
		console.log(target)
		console.log(ctx)
		console.log(args)
		return target(...args)
	},
})

console.log(interProxy(1, 2))

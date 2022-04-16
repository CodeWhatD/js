// 仿写Promise

// 定义三种状态
const PENDING = 'pending'
const REJECT = 'reject'
const FULLFULLED = 'fullfulled'

class MyPromise {
	constructor(excutute) {
		try {
			excutute(this.resolve, this.reject) // new的时候立即执行
		} catch (e) {
			this.reject(e)
		}
	}
	// 为了支持外部直接调用 MyPromise.resolve
	static resolve = (param) => {
		if (param instanceof MyPromise) {
			return param
		} else {
			return new MyPromise((resolve) => {
				resolve(param)
			})
		}
	}
	// 为了支持外部直接调用 MyPromise.reject
	static reject = (reason) => {
		return new MyPromise((resolve, reject) => {
			reject(reason)
		})
	}
	status = 'pending' // 状态初始值是pending
	value = ''
	reason = '' // reject的原因
	onFulfilledCallbacks = [] // 保存成功后的回调数组
	onRejectedCallbacks = [] // 失败后的回调数组

	resolve = (value) => {
		if (this.status === PENDING) {
			this.status = FULLFULLED
			this.value = value
			while (this.onFulfilledCallbacks.length) {
				this.onFulfilledCallbacks.shift()(this.value) // 从开头弹出一个并且传入resolve给的值
			}
		}
	}
	reject = (reason) => {
		if (this.status === PENDING) {
			this.status = REJECT
			this.reason = reason
			while (this.onRejectedCallbacks.length) {
				this.onRejectedCallbacks.shift()(this.value) // 从开头弹出一个并且传入resolve给的值
			}
		}
	}
	then = (onFulfilled, onRejected) => {
		// 链式调用时，可以不传入回调所以这里需要做两步处理
		onFulfilled =
			typeof onFulfilled === 'function'
				? onFulfilled
				: (value) => {
						return value
				  }
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: (reason) => {
						throw reason
				  }

		// 为了链式调用，需要返回一个Promise
		const promiseTwo = new MyPromise((resolve, reject) => {
			if (this.status === FULLFULLED) {
				// 这里创建微任务队列的目的是，因为你要判断它是否返回的是自己
				// 所以你需要传入promiseTwo来判断，如果不使用微任务那么
				// 你判断的这个操作是同步的，这时候promiseTwo没有初始化好
				queueMicrotask(() => {
					try {
						const x = onFulfilled(this.value)
						resolvePromise(promiseTwo, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			} else if (this.status === REJECT) {
				try {
					const x = onRejected(this.value)
					resolvePromise(promiseTwo, x, resolve, reject)
				} catch (e) {
					reject(e)
				}
				onRejected(this.reason)
			} else if (this.status === PENDING) {
				// 此情况对于异步任务，因为如果你的excutute函数是一个异步的，那么如果你不搞这个判断分支这个then是同步会直接执行，无法运行到你异步的内容
				// 改进1：因为你使用promise实例一直执行.then那么需要存入一个数组然后依次执行
				// 改进2：异步任务也需要利用捕获的做法包起来
				this.onFulfilledCallbacks.push(() => {
					queueMicrotask(() => {
						try {
							const x = onFulfilled(this.value)
							resolvePromise(promiseTwo, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})
				this.onRejectedCallbacks(() => {
					queueMicrotask(() => {
						try {
							const x = onRejected(this.value)
							resolvePromise(promiseTwo, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})
			}
		})
		return promiseTwo
	}
}

const resolvePromise = function (promise, x, resolve, reject) {
	if (promise === x) {
		// 如果你返回的是你自己就报错
		throw new TypeError('Chaining cycle detected for promise #<Promise>')
	}
	// 判断x是不是 MyPromise 实例对象
	if (x instanceof MyPromise) {
		// 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
		// x.then(value => resolve(value), reason => reject(reason))
		// 简化之后
		x.then(resolve, reject)
	} else {
		// 普通值
		resolve(x)
	}
}

const promise = new MyPromise((resolve, reject) => {
	resolve('success')
})

const other = () => {
	return new MyPromise((resolve, reject) => {
		resolve('other')
	})
}
const p1 = promise.then((res) => {
	console.log(1)
	console.log(res)
	return p1
})

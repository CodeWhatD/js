// 空 Set集合
const bucket = new WeakMap()
// 想要响应式的数据
const data = {
	test: 'vue2',
	ok: true,
}
// 当前副作用函数
let affectFunction
/**
 * 注册副作用函数
 */
const effect = function (fn) {
	const effectFn = () => {
		cleanUp(effectFn)
		affectFunction = effectFn
		fn()
	}
	effectFn.deps = []
	effectFn()
}
/**
 * 对应问题1清除依赖
 */
const cleanUp = function (effectFn) {
	for (let i = 0; i < effectFn.deps.length; i++) {
		const deps = effectFn.deps[i]
		deps.delete(effectFn)
	}
	effectFn.deps.length = 0
}
/**
 * 封装收集依赖函数
 */
const track = function (target, key) {
	if (!affectFunction) return
	let depMaps = bucket.get(target)
	if (!depMaps) {
		depMaps = new Map()
		bucket.set(target, depMaps)
	}
	let depSets = depMaps.get(key)
	if (!depSets) {
		depSets = new Set()
		depMaps.set(key, depSets)
	}
	depSets.add(affectFunction)
	affectFunction.deps.push(depSets)
}
/**
 * 封装触发依赖
 */
const trigger = function (target, key) {
	let depsMap = bucket.get(target)
	if (!depsMap) return
	let effectFns = depsMap.get(key)
	const effectToRun = new Set(effectFns)
	effectToRun.forEach((effectFn) => effectFn())
	// effectFns && effectFns.forEach((fn) => fn())
	return true
}
/**
 * 将数据代理
 */
const app = new Proxy(data, {
	get(target, key) {
		track(target, key)
		return target[key]
	},
	set(target, key, value) {
		target[key] = value
		trigger(target, key)
	},
})
// 执行effect并且传入副作用函数
effect(() => {
	document.body.innerText = app.ok ? app.test : 'not'
})
// 两秒之后设置
setTimeout(() => {
	app.ok = false
	app.test = 'No'
}, 2000)

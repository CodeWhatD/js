const handler = {
	has(target, key) {
		if (key.charAt(0) === '_') {
			// 如果是私有属性则不让in操作找到
			return false
		}
		return key in target
	},
}
const target = { _proxy: '私有', name: 'ls' }
const hasProxy = new Proxy(target, handler)

console.log('_proxy' in hasProxy)

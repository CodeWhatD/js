const obj = {
	toString() {
		return '2'
	},
	valueOf() {
		return '1'
	},
}

console.log(+obj) // 1 valueOf优先级比toString高

const createArray = (...args) => {
	const handler = () => {
		return {
			get(target, key) {
				let index = Number(key)
				if (index < 0) {
					console.log('1111')
					return target[target.length - 1 + index]
				}
				return target[index]
			},
		}
	}
	return new Proxy([...args], handler())
}

const arr1 = createArray(1, 2, 3)

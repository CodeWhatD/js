/**
 * MDN Note
 * Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，
 * 其排列与使用 for...in 循环遍历该对象时返回的顺序一致
 *（区别在于 for-in 循环还会枚举原型链中的属性）。
 */

const obj = {
	a: '1',
	b: '2',
}

const result = Object.entries(obj)
console.log(result) /* [ [ 'a', '1' ], [ 'b', '2' ] ] */

// MDN EXAMPLE
const obj = { foo: 'bar', baz: 42 }
console.log(Object.entries(obj)) // [ ['foo', 'bar'], ['baz', 42] ]

// array like object
const obj = { 0: 'a', 1: 'b', 2: 'c' }
console.log(Object.entries(obj)) // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

// array like object with random key ordering
const anObj = { 100: 'a', 2: 'b', 7: 'c' }
console.log(Object.entries(anObj)) // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

// getFoo is property which isn't enumerable
const myObj = Object.create(
	{},
	{
		getFoo: {
			value() {
				return this.foo
			},
		},
	}
)
myObj.foo = 'bar'
console.log(Object.entries(myObj)) // [ ['foo', 'bar'] ]

// non-object argument will be coerced to an object
console.log(Object.entries('foo')) // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

// iterate through key-value gracefully
const obj = { a: 5, b: 7, c: 9 }
for (const [key, value] of Object.entries(obj)) {
	console.log(`${key} ${value}`) // "a 5", "b 7", "c 9"
}

// Or, using array extras
Object.entries(obj).forEach(([key, value]) => {
	console.log(`${key} ${value}`) // "a 5", "b 7", "c 9"
})

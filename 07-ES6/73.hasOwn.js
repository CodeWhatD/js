// 一般判断属性是否在对象上会使用 hasOwnProperty

class Person {
	constructor(name) {
		this.name = name;
	}
}
Person.prototype.age = 18;
const p1 = new Person("ddd");

// 1. in 方法
console.log("age" in p1); // true 此方法不仅会在当前对象中找还会沿着原型链找

// 2.hasOwnProperty 表示该属性是否在自身对象上
console.log(p1.hasOwnProperty("age")); // false
console.log(p1.hasOwnProperty("name")); // true
// 但是这种会有一些隐患
// 创建一个无原型的对象
// Object.create(null).hasOwnProperty("age"); // 这里因为你创建了一个无原型的对象那么找不到hasOwnProperty，直接报错

// 3.hasOwn  这个方法可以避免以上的问题，更加安全
console.log(Object.hasOwn(p1, "name")); // true
console.log(Object.hasOwn(p1, "age")); // false
console.log(Object.hasOwn(Object.create(null), "name")); // false 这里就不报错了

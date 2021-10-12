var animate = function (obj,target,callback) {
	clearInterval(obj.timer)
	obj.timer = setInterval(function () {
		// -715
		var step = (target - obj.offsetLeft) / 10 // -721 - -715 = -6
		// console.log(step)
		step = step >0 ? Math.ceil(step) : Math.floor(step)
		if(step === -1) {
			step --
		}
		if (obj.offsetLeft === target) {
			clearInterval(obj.timer);
			callback && callback();
		}
		// console.log(step)
		// console.log(obj.offsetLeft)
		obj.style.left = obj.offsetLeft + step + 'px'
		// console.log(obj.style.left)
	},30)
}

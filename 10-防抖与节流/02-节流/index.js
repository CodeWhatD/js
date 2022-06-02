const throttle = function (fn, time) {
	let timeOne = 0;
	return function() {
		let timeTwo = new Date();
		if (timeTwo - timeOne > time) {
			let args = arguments;
			fn.apply(this, args);
			timeOne = timeTwo;
		}
	};
};

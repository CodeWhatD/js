const Event = (function () {
  let calQueue = {},
    listen,
    trigger,
    remove;
  listen = function (key, fn) {
    if (!calQueue[key]) {
      calQueue[key] = [];
    }
    calQueue[key].push(fn);
  };
  trigger = function (key, ...args) {
    const fns = calQueue[key];
    if (!fns && fns.length < 0) {
      return false;
    }
    fns.forEach((fn) => {
      fn.apply(this, args);
    });
  };
  remove = function (key, fn) {
    const fns = calQueue[key];
    if (!fn) {
      return false;
    }
    if (!fn) {
      fns.length = 0;
      return false;
    }
    fns.forEach((f, index) => {
      if (f === fn) {
        fns.splice(index, 1);
      }
    });
  };
  return {
    listen,
    trigger,
    remove,
  };
})();
Event.listen("xm", (n) => {
  console.log(n);
  console.log("回调1");
});
Event.trigger("xm", "钥匙")

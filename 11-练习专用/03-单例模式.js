const CreateDiv = (function () {
  let instance;

  const CreateDiv = function (html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return (instance = this);
  };

  CreateDiv.prototype.init = function () {
    console.log(this.html);
  };

  return CreateDiv;
})();

const a = new CreateDiv("a");
const b = new CreateDiv("b");

console.log(a, b);
console.log(a === b);

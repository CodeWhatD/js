// lib
const checkType = (thing) => {
  const { toString } = Object.prototype;
  const resultString = toString.call(thing).slice(8, -1);
  return resultString.toLowerCase();
};

/**
 * example
 */
console.log(checkType(11));

const name = "CodeWhat_";
const age = 11;


// 这样也可以导出
exports.name = name;
exports.age = age;

// 原理
/**
 * Node源码里有这样类似的逻辑
 * module.exports = {}
 * exports = modules.exports
 * 
 * 这样如果你往exports中放东西，那么其实也时往module.exports的对象中放
 */
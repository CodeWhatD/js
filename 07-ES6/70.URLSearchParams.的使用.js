const fakeSearch = "?name=text&age=18";
const searchObj = new URLSearchParams(fakeSearch.replace("/?/", ""));
console.log(searchObj.get("name")); // text
console.log(searchObj.has("name")); // true

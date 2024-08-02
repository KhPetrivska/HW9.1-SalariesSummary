"use strict";
//debugger;

const company = {
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 600 },
  ],
  development: {
    web: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 },
    ],
    internals: [{ name: "Jack", salary: 1300 }],
  },
};

//creating a copy
function deepCopy(obj) {
  const primitiveTypesOrFunc = [
    "string",
    "number",
    "boolean",
    "undefined",
    "function",
  ];
  if (primitiveTypesOrFunc.includes(typeof obj) || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item));
  }

  const objCopy = Object.assign({}, obj);
  Object.keys(objCopy).forEach((propName) => {
    objCopy[propName] = deepCopy(objCopy[propName]);
  });
  return objCopy;
}
const companyCopy = deepCopy(company);

//solving

const salariesArray = [];

function getSalariesList(obj) {
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      filterByProp(item);
    });
  }
  Object.keys(obj).forEach(function (propName) {
    filterByProp(propName);
    obj[propName] = getSalariesList(obj[propName]);
  });
  return salariesArray;
}

function filterByProp(objInner) {
  Object.keys(objInner).forEach(function (property) {
    if (property === "salary") {
      salariesArray.push(objInner[property]);
    }
  });
  return;
}

getSalariesList(companyCopy);

// count summary

let result = 0;
salariesArray.forEach(function (item) {
  result += item;
});

console.log(result);
console.log(company);
console.log(companyCopy);

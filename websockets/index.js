// const number = undefined + 11;
// if (number === NaN) {
//   document.write("NaN");
// } else if (number === 11) {
//   document.write("11");
// } else {
//   document.write("other");
// }
// console.log(typeof NaN);

// Remove Duplicates Value From Array
// let array_b = ["js", 1, 2, "js", 1, "interview", "2", true, "interview"];
// Result = > [ 'js', 1, 2, 'interview', '2', true ]

// var obj = {};
// for (let index = 0; index < array_b.length; index++) {
//   if (obj[array_b[index]] === undefined) {
//     obj[array_b[index]] = 1;
//   } else {
//     obj[array_b[index]]++;
//   }
// }

// for (var i = 0; i < array_b.length; i++) {
//   if (!result.includes(array_b[i])) {
//     result.push(array_b[i]);
//   }
// }
// console.log(result);
// console.log(Object.keys(obj));

// Reverse an Array and the String inside it.
let array_a = [1, 2, 3, 4, "random", 6, 7, 8, "js", "interview"];
// Result => [ 'weivretni', 'sj', 8, 7, 6, 'modnar', 4, 3, 2, 1 ];
function reverseString(str) {
  var result = "";
  for (var i = str.length - 1; i >= 0; i--) {
    result = result + str[i];
  }
  return result;
}
var result = [];
for (var i = 0; i < array_a.length; i++) {
  if (typeof array_a[i] === "string") {
    result.push(reverseString(array_a[i]));
  } else {
    result.push(array_a[i]);
  }
}
console.log(result.reverse());

// console.log(typeof "abd");
let a = { x: 1, y: 2 };
let b = a;
a.x = 2;
console.log(a, b);

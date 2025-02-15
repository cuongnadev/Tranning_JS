# HOISTING

- Hoisting is a JavaScript mechanism where variable and function declarations are raised to the top of the scope before the code is executed.

## Example

#### Ex1:
```js
// hoisting with var variable

console.log(x);// undefined
var x = 5;
console.log(x);// 5
```


#### Ex2:
```js
// hoisting with let or const variable

console.log(x);// ReferenceError: Cannot access 'x' before initialization 
let x = 5;
console.log(x);// 5
```


#### Ex3:
```js
// hoisting with Declaration function

getName(); // Cuong
function getName () {
    console.log("Cuong");
}
```


#### Ex4:
```js
// hoisting with Expression function

getName(); // // ReferenceError: Cannot access 'getName' before initialization
const getName = function () {
    console.log("Cuong");
}
```


#### Ex5:
```js
// hoisting with Arrow function

getName(); // ReferenceError: Cannot access 'getName' before initialization
const getName = () => {
    console.log("Cuong");
}
```

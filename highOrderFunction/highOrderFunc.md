# High Order Function

- High Order Function is a function that takes one or more function as args or can return a new function.

### Example

```js
const myFunc = (a, b, operation) => {
    return operation(a, b);
}

const sum = (a, b) => {
    return a + b;
}

const power = (a, b) => {
    return a ** b;   
}

console.log(myFunc(2, 3, sum));// 5
console.log(myFunc(2, 3, power));// 8
```
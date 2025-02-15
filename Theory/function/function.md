# FUNCTION

- There are 3 ways to define a function:

  - Declaration function
  - Expression function
  - arrow function (ES6)

## 1. DECLARATION FUNCTION 

### Example

````js
function sum(a, b) {
  return a + b;
}
````

## 2. EXPRESSION FUNCTION 

### Example

```js
const sum = function (a, b) {
  return a + b;
};
```

## 3. ARROW FUNCTION

### Example

#### ES5

```js
const sum = function (a, b) {
  return a + b;
};
```

#### ES6

```js
const sum = (a, b) => {
  return a + b;
};
```

- Arrow functions do not have their own `this`, It inherits this from the context where it is defined.
- Arrow functions are not hoisted. They must be defined before they are used.
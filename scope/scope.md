# SCOPE

- JavaScript variables have 3 types of scope:

  - Block scope
  - Function scope
  - Global scope

## BLOCK SCOPE

- Variables declared with `var` doesn't have block scope
- Variables declared with `const` and `let` have block scope

### `var`

```js
{
  var age = 20;
}

console.log(age);
```

#### Output

```
20
```

### `let`

```js
{
  let age = 20;
}

console.log(age); // ReferenceError: age is not defined
```

### `const`

```js
{
  const age = 20;
}

console.log(age); // ReferenceError: age is not defined
```

## FUNCTION SCOPE

- Variables declared with `var`, `const` and `let` have function scope

## GLOBAL SCOPE

- Variables declared outside of function and block become global
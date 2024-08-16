# OBJECTS ES6

## 1. DESTRUCTURING

## 1.1 Destructuring with Array

#### ES5:
```js
let car = ["Toyota", "Ford", "Mazda" ];
let toyota = car[0];
let ford = car[1];
let mazda = car[2];
console.log(toyota, ford, mazda);// Toyota Ford Mazda
```

#### ES6:
```js
let car = ["Toyota", "Ford", "Mazda" ];
let [toyota, ford, mazda] = car;
console.log(toyota, ford, mazda);// Toyota Ford Mazda
```

## 1.2 Destructuring with Object

#### ES5:
```js
let person = {
    name: "Cuong",
    age: 19
};
let name = person.name;
let age = person.age;

console.log(name, age);// Cuong 19
```

#### ES6:
```js
let person = {
    name: "Cuong",
    age: 19
};
let {name, age} = person;

console.log(name, age);// Cuong 19
```


## 2. REST PARAMETERS `...`

- Rest parameters are mainly used in two main cases in JavaScript:

    - When defining a function: To collect unknown arguments into an array.
    - When destructuring: To include the remaining parts of an array or object during destructuring.

#### Ex1:
```js
function myFunc(...nums) {
    // nums = [1, 2, 3, 4]
    return nums.reduce((total, num) =>  total += num, 0);
}
console.log(myFunc(1, 2, 3, 4));// 10
```

#### Ex2:
```js
let nums = [1, 2, 3, 4, 5, 6];
let [a, b, c, ...remaining] = nums;
console.log(a, b, c, remaining);// 1 2 3 [4, 5, 6]
```


## 3. SPREAD OPERATOR `...`

- The JavaScript spread operator (`...`) is used to copy all or a part of an array or object into another array or object.

### 3.1 Array

#### Ex1:
```js
const fruits = ['apple', 'banana'];
const otherFruits = ['orange', 'mango'];

console.log([...fruits, ...otherFruits]);// ['apple', 'banana', 'orange', 'mango']
```

#### Ex2:
```js
const numbers = [1, 2, 3];

function add(a, b, c) {
    return a + b + c;
}

console.log(add(...numbers)); // 6
```

### 3.2 Object

#### Ex1:
```js
let person = {name: "Cuong", age: 18};
let job = {jobName: "Dev", experience: "Junior"}

console.log({...person, ...job});// {name: "Cuong", age: 18, jobName: "Dev", experience: "Junior"}
```

#### Ex2:
```js
const colors = ['red', 'green', 'blue'];

const colorObject = { ...colors };
console.log(colorObject);// { '0': 'red', '1': 'green', '2': 'blue' }
```

#### Ex3:
```js
const user1 = { name: 'Cuong', age: 20 };
const user2 = { name: 'Thi', age: 20 };

const users = [{ ...user1 }, { ...user2 }];
console.log(users); 
// [{ name: 'Cuong', age: 20 }, { name: 'Thi', age: 20 }]
```


## 4. COMPUTED PROPERTY

- Computed properties allow you to use the values of expressions as property names of an object

### Ex1:
```js
const input = "age";

const object = {
    name: "Cuong",
    [input]: 18
};

console.log(object);// { name: 'Cuong', age: 18 }
```


## 5. SHORTHAND NAMES

- if the Object key has the same name as the variable then use it as follows:

#### ES5:
```js
    let name = "Cuong";

    let person = {
        name: name,
    }

    console.log(person.name);// Cuong
```

#### ES6:
```js
    let name = "Cuong";

    let person = { name }

    console.log(person.name);// Cuong
```


## 6. METHOD DEFINITIONS

#### ES5:
```js
let person = {
    name: "Cuong",
    myFunc: function () {
        console.log("My name is", this.name);
    }
}

person.myFunc();// My name is Cuong
```

#### ES6:
```js
    let person = {
        name: "Cuong",
        myFunc () {
            console.log("My name is", this.name);
        }
    }

    person.myFunc();// My name is Cuong
```
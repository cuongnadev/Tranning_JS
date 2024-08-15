# PROMISE

- Promises help manage asynchronous tasks in a clear and can easy controll way.

### Ex1:
```js
// using a simple Promise
const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log("Hello!"));
        }, ms);
    })
}
delay(1000)
    .then((message) => message)
    .catch((error) => console.log(error))
// Hello!
```

### Ex2:
```js
// Run multiple Promises concurrently with Promise.all():
const promise1 = Promise.resolve(445);
const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, "Cuong"));
const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 5000, "Nguyen"));

Promise.all([promise1, promise2, promise3])
    .then((value) => {
        console.log(value);
    })
    .catch((error) => console.log(error))
// [ 445, 'Cuong', 'Nguyen' ]
```

### Ex3:
```js
// Handling Promises sequentially with then():
const fetchData = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data");
        }, ms)
    })
}

fetchData(1000)
    .then((value) => {
        console.log(value);
        return "Continue Data Processing.";
    })
    .then((message) => console.log(message))
    .catch((error) => console.log(error))
// Data
// Continue Data Processing.
```

### Ex4:
```js
// Handling some errors with Promise.allSettled():
const promise1 = Promise.resolve(4);
const promise2 = Promise.reject('Error');
const promise3 = Promise.resolve(5);

Promise.allSettled([promise1, promise2, promise3])
    .then((results) => {
        results.forEach((result) => {
            if (result.status === 'fulfilled') {
                console.log('Success:', result.value);
            } else {
                console.error('Defeat:', result.reason);
            }
        });
    });
// 4
// Error
// 5
```
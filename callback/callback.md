# CALLBACK

- callback is a function that used in another function and passed as an argument.

### Example

```js
const myReduce = (arr, callback, initialValue) => {
    let result;
    if (initialValue !== undefined) {
        result = initialValue;
    } else {
        if (arr.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        result = arr[0];
        arr = arr.slice(1);
    }
    for(let i = 0; i < arr.length; i++) {
        result = callback(result, arr[i])
    }
    return result;
}

const total = (total, num) => {
    return total + num;
}

let arr = [1, 2, 3, 4, 5];
console.log(myReduce(arr, total, 0)); // 15
```
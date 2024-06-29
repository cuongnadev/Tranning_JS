//The Sum of a Range
function range(start, end, step = 1) {
    let array = [];
    if(step > 0) {
        for(let i = start; i <= end; i += step) {
            array.push(i);
        }
    }else {
        for(let i = start; i >= end; i += step) {
            array.push(i);
        }
    }
    return array;
}
function sum(arr) {
    let sum = 0;
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
let arr = range(1, 10, 2);
console.log(arr);
console.log(sum(arr))


// Reversing an Array
function reverseArray(array) {
    let newArray = [];
    for (let i = array.length - 1; i >= 0; i--) {
        newArray.push(array[i]);
    }
    return newArray;
}
// reverseArray: Hữu ích hơn trong những trường hợp cần tính bất biến và không thay đổi mảng ban đầu. Tuy nhiên, nó kém hiệu quả về bộ nhớ do tạo ra một mảng mới.
function reverseArrayInPlace(array) {
    let left = 0;
    let right = array.length - 1;
    while (left < right) {
        let temp = array[left];
        array[left] = array[right];
        array[right] = temp;
        left++;
        right--;
    }
    return array; 
}
// reverseArrayInPlace: Hữu ích hơn khi muốn tiết kiệm bộ nhớ và không cần giữ nguyên thứ tự mảng ban đầu. Nó chạy nhanh hơn về mặt hiệu suất bộ nhớ.


// A List
function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = { value: array[i], rest: list };
    }
    return list;
}
function listToArray(list) {
    let array = [];
    for(let node = list; node < list.length; node = list.rest) {
        array.push(list.value);
    }
    return array;
}
function prepend(element, list) {
    return {value: element, rest: list};
}
function nth(list, position) {
    let count = 0;
    for (let node = list; node; node = node.rest) {
        if (count === position) {
            return node.value;
        }
        count++;
    }
    return undefined;
}
function nthRecursive(list, position) {
    if (!list) {
        return undefined;
    } else if (position === 0) {
        return list.value;
    } else {
        return nthRecursive(list.rest, position - 1);
    }
}
let array = [1, 2, 3];
let list = arrayToList(array);
console.log("List:", list);

let arrayFromList = listToArray(list);
console.log("Array:", arrayFromList);

let newList = prepend(0, list);
console.log("New List with 0 prepended:", newList);

console.log("Element at position 1:", nth(list, 1));
console.log("Element at position 3:", nth(list, 3));

console.log("Recursive element at position 1:", nthRecursive(list, 1));
console.log("Recursive element at position 3:", nthRecursive(list, 3));


// Deep Comparison
function deepEqual(value1, value2) {
    if (value1 === value2) {
        return true;
    }

    if (value1 === null || typeof value1 !== "object" || value2 === null || typeof value2 !== "object") {
        return false;
    }

    let keys1 = Object.keys(value1);
    let keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(value1[key], value2[key])) {
            return false;
        }
    }

    return true;
}
let obj1 = {a: 1, b: {c: 3}};
let obj2 = {a: 1, b: {c: 3}};
let obj3 = {a: 1, b: {c: 4}};

console.log(deepEqual(obj1, obj2)); 
console.log(deepEqual(obj1, obj3)); 
console.log(deepEqual(obj1, null)); 
console.log(deepEqual(null, null)); 
console.log(deepEqual(obj1, {a: 1, b: {c: 3}, d: 4}));
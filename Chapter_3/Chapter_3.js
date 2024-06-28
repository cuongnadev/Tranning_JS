// Minimun
function min(a, b) {
    return Math.min(a, b);
}
console.log(min(5,2));

// Recursion
function isEven(n) {
    if(n < 0) {
        n = Math.abs(n);
    }
    if(n === 0) {
        return true;
    }else if(n === 1) {
        return false;
    }else {
        return isEven(n - 2);
    }
}
console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));

// Bean Counting
function countBs(str) {
    return countChar(str, "B");
}
function countChar(str, char) {
    let count = 0;
    for(let i = 0; i < str.length; i++) {
        if(str[i] === char) {
            count++;
        }
    }
    return count;
}
console.log(countBs("ABCCBA"));
console.log(countChar("AlIbAbA Hello Anh Em", "A"));
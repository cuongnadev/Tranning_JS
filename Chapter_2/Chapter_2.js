// Exercise 1
console.log("#");
console.log("##");
console.log("###");
console.log("####");
console.log("#####");
console.log("######");
console.log("#######");

// Exercise 2
let abc = "abc";
console.log(abc.length);

// Exercise 3 (FizzBuzz)
for(let i = 1; i <= 100; i++) {
    let output = '';
    if (i % 3 === 0) output += 'Fizz';
    if (i % 5 === 0) output += 'Buzz';
    console.log(output || i);
}

// Exercise 4 (Chessboard)
let size = 8;
let chessboard = "";
for(let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
        if((i+j) % 2 === 0) {
            chessboard += " ";
        } else {
            chessboard += "#";
        }
    }
    chessboard += "\n";
}
console.log(chessboard);

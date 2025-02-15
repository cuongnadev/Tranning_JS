
// scope

// ex1: 
let age = 20; // variable global
function func1() {
    console.log("variable global age in function scope:", age);// work
}
func1();
console.log("variable global age in global scope:", age);// work


// ex2:
function func1() {
    let name = "Cuong"; // variable of function
    console.log("variable name of function in function scope:", name);// work
}
func1();
console.log("variable name of function in global scope:", name);// ReferenceError: name is not defined


// ex3:
function func1() {
    let check = true; // variable of function
    if(check) {
        let height = 1.55;
        console.log("variable height of block in block scope:", height);// work
    }
    console.log("variable height of function in function scope:", height);// ReferenceError: height is not defined
}
func1();
console.log("variable height of function in global scope:", height);// ReferenceError: height is not defined
// Regexp Golf
/** 
 * 1. car and cat
 * /ca[rt]/
 * 2. pop and prop
 * /pr?op/
 * 3. ferret, ferry, and ferrari
 * /ferr(et|y|ari)/
 * 4. Anywordending in ious
 * /\b\w+ious\b/
 * 5. Awhitespace character followed by a period, comma, colon, or semicolon.
 * /\s[.,:;]/
 * 6. Awordlonger than six letters
 * /\b\w{7,}\b/
 * 7. Awordwithout the letter e (or E)
 * /\b[^eE\s]+\b/
*/

// Quoting Style
let story = "She said 'I'm fine,' but he replied, 'That's great!'";
let replacedStory = story.replace(/(\b\w*)'(\w*\b)/g, (match, p1, p2) => {
    if (p1 === "" || p2 === "") {
        return match;
    } else {
        return p1 + '"' + p2;
    }
});

console.log(replacedStory);

// Numbers Again
let regex = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/;

console.log(regex.test("123"));    // true
console.log(regex.test("+456"));   // true
console.log(regex.test("-0.789")); // true
console.log(regex.test("7."));     // true
console.log(regex.test(".123"));   // true
console.log(regex.test("5e10"));   // true
console.log(regex.test("1E-5"));   // true

console.log(regex.test("."));      // false
console.log(regex.test("5."));     // false
console.log(regex.test("e10"));    // false



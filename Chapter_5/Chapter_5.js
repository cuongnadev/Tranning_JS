// Flattening
function flatten(array) {
    return array.reduce((prev, curr) => {
        return prev.concat(curr);
    }, []);
}
console.log(flatten([[1, 2], [3, 4], [5, 6]]));

// Your Own Loop
function loop(value, test, update, body) {
    while (test(value)) {
      body(value);
      value = update(value);
    }
}
  
loop(
    3,                   
    n => n > 0,       
    n => n - 1,       
    console.log       
);

// Everything
function every(array, predicate) {
    for(let element of array) {
        if(!predicate(element)) {
            return false;
        }
    }
    return true;
}
function everySome(array, predicate) {
    return !array.some(element => !predicate(element));
}

console.log(every([1, 2, 3, 4], n => n > 0));
console.log(every([1, 2, 3, -4], n => n > 0));
console.log(everySome([1, 2, 3, 4], n => n > 0));
console.log(everySome([1, 2, 3, -4], n => n > 0));

// Dominant Writing Direction
function characterScript(code) {
    const SCRIPTS = [
    {name: "Latin", ranges: [[65, 90], [97, 122]], direction: "ltr"},
    {name: "Arabic", ranges: [[1536, 1791]], direction: "rtl"},
    {name: "Han", ranges: [[11904, 12031], [12032, 12245], [12272, 12283], [12293, 12351], [19968, 40959]], direction: "ttb"},
    ];
  
    for (let script of SCRIPTS) {
      for (let [from, to] of script.ranges) {
        if (code >= from && code < to) {
          return script;
        }
      }
    }
    return null;
  }
  function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
      let name = groupName(item);
      let known = counts.findIndex(c => c.name === name);
      if (known === -1) {
        counts.push({name, count: 1});
      } else {
        counts[known].count++;
      }
    }
    return counts;
  }
  function dominantDirection(text) {
    let scripts = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
    }).filter(({name}) => name !== "none");
  
    if (scripts.length === 0) return "none";
  
    return scripts.reduce((a, b) => a.count > b.count ? a : b).name;
  }
  
  console.log(dominantDirection("Hello!")); // "ltr"
  console.log(dominantDirection("مرحبا!")); // "rtl"
  console.log(dominantDirection("你好!")); // "ttb"
  
//  A Vector Type
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    minus(other) {
        return new Vec(this.x - other.x, this.y - other.y);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

let vec1 = new Vec(1, 2);
let vec2 = new Vec(2, 3);

console.log(vec1.plus(vec2)); // Vec { x: 3, y: 5 }
console.log(vec1.minus(vec2)); // Vec { x: -1, y: -1 }
console.log(vec1.length);
console.log(vec2.length);

// Groups, Iterable Groups
class Group {
    constructor() {
      this.members = [];
    }
  
    add(value) {
      if (!this.has(value)) {
        this.members.push(value);
      }
    }
  
    delete(value) {
      this.members = this.members.filter(member => member !== value);
    }
  
    has(value) {
      return this.members.includes(value);
    }
  
    static from(iterable) {
      let group = new Group();
      for (let value of iterable) {
        group.add(value);
      }
      return group;
    }
    [Symbol.iterator]() {
        let index = 0;
        let members = this.members;
    
        return {
          next() {
            if (index >= members.length) {
              return { done: true };
            } else {
              return { value: members[index++], done: false };
            }
          }
        };
      }
  }
  
  // 
  let group = Group.from([10, 20, 30]);
  console.log(group.has(10)); 
  console.log(group.has(40)); 
  
  group.add(10);
  group.delete(10);
  console.log(group.has(10)); 

  for (let value of group) {
    console.log(value);
  }

// Borrowing a Method
let obj = {
    hasOwnProperty: 'customValue', // Ví dụ về thuộc tính trùng tên với phương thức
    foo: 'bar'
  };
  
  // Sử dụng Object.prototype.hasOwnProperty.call(obj, propertyName)
  console.log(Object.prototype.hasOwnProperty.call(obj, 'foo')); // true
  console.log(Object.prototype.hasOwnProperty.call(obj, 'hasOwnProperty')); // true
  
  // Gọi trực tiếp obj.hasOwnProperty() sẽ gây ra lỗi hoặc kết quả không mong muốn
  // console.log(obj.hasOwnProperty('foo')); // Sẽ gây ra lỗi hoặc kết quả không mong muốn
  
  
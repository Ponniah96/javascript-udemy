'use strict';

// Constructor function
console.log('--------Constructor Function----------');

// By convention, constructor function names start with a capital letter
const Person = function (firstName, birthYear) {
  //constructor function
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this because it creates a new function for each object
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

// Creating new objects
const jonas = new Person('Jonas', 1991);
console.log(jonas);

// we can create multiple objects using the same constructor function
const matilda = new Person('Matilda', 2017); //
console.log(matilda);

const jack = new Person('Jack', 1975);
console.log(jack);

console.log(jonas instanceof Person);

////////////////////////////////////////////////
// Prototypes
console.log('--------Prototypes----------');

console.log(
  'Prototype is simply an object that is attached to another object.',
);

// Prototype property of Person constructor function can handle properties and methods to share all the object instances
console.log(Person.prototype);

// Adding properties to the prototype
Person.prototype.species = 'Homo Sapiens';

console.log(jonas.species);

// Adding a method to the prototype
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__); // __proto__ refers to Person.prototype
console.log(jonas.__proto__ === Person.prototype);

// isPrototypeOf method checks if an object is prototype of another object
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// Testing
// const Employee = function (id, name, role, startYear) {
//   this.id = id;
//   this.name = name;
//   this.role = role;
//   this.startYear = startYear;
// };
// const ponniah = new Employee(1023, 'Ponniah', 'Full Stack Developer', 2018);
// console.log(ponniah);
// Employee.prototype.exp = function () {
//   return new Date().getFullYear() - this.startYear;
// };
// console.log(ponniah.exp());
// console.log(ponniah);

//////////////////////////////////////////////
console.log(
  '--------Behind the scenes of new operator and constructor function----------',
);
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

////////////////////////////////////////////////
console.log('--------Prototype Chain----------');

console.log(
  'Prototype chain is mainly used to verify properties and methods available in constructor function(preson) and object prototype which is not defined in object instance (jonas)',
);

// Every function in JavaScript has a prototype property
console.log(Person.prototype);

// The prototype of jonas is Person.prototype
console.log(jonas.__proto__);

// The prototype of Person.prototype is Object.prototype
console.log(jonas.__proto__.__proto__);

// Object.prototype is the top of prototype chain
console.log(jonas.__proto__.__proto__.__proto__); // null

// Checking if something is prototype of another thing
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Object.prototype.isPrototypeOf(jonas)); // true

//////////////////////////////////////////////
console.log('--------Adding Prototype to Built-in Objects----------');

console.log(
  'We can also add methods to built-in objects prototype like Array, String, etc. But it is not a good practice to modify built-in objects prototype.',
);

// Adding a method to Array prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};

const arr = [3, 6, 3, 2, 6, 7, 2, 1, 9];
console.log(arr.unique());

// Checking prototype of array
console.log(arr.__proto__); // Array.prototype
console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__); // Object.prototype

//Testing. This is bad practice to modify built-in objects prototype. because it can lead to conflicts with other code.
// Array.prototype.multiplyBy = function (n) {
//   return this.map(el => el * n);
// };
// const numbers = [1, 2, 3, 4, 5];
// console.log(numbers.multiplyBy(2));

//HTML Elements prototype
console.log('HTML Element Prototype Chain');
const h1 = document.querySelector('h1');
console.log(h1);
console.dir(h1); // shows the properties of h1 element
console.log(h1.__proto__); // HTMLHeadingElement.prototype. represents <h1> element
console.log(h1.__proto__.__proto__); // HTMLElement.prototype. represents all HTML elements means <p>, <div>, <span>, etc.
console.log(h1.__proto__.__proto__.__proto__); // Element.prototype. represents all DOM elements which means elements inside <svg>, <math>, etc.
console.log(h1.__proto__.__proto__.__proto__.__proto__); // Node.prototype. represents all types of nodes like text nodes, comment nodes, etc.
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget.prototype. represents all event targets like window, document, etc.
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // Object.prototype. null

// difference between console.log vs console.dir
const f = function () {
  console.log('Hello World');
};
//conssole.dir is used to display an interactive list of the properties of the specified JavaScript object. mainly used for functions. difference between console.log and console.dir is more apparent when logging functions.
console.log(f); // shows the function code
console.dir(f); // shows the function object with properties.

/////////////////////////////////////////////
console.log('--------Summary----------');
console.log(
  '1. Constructor functions are a way to create multiple similar objects using the "new" keyword.',
);
console.log(
  '2. Prototypes are the mechanism by which JavaScript objects inherit features from one another. It allow for shared properties and methods among all instances created by a constructor function, promoting memory efficiency',
);
console.log(
  '3. Every function in JavaScript has a prototype property that is used to build the __proto__ property on instances created by that function when used as a constructor.',
);
console.log(
  '4. The prototype chain is used to look up properties and methods on objects. If a property or method is not found on the object itself, JavaScript looks up the prototype chain until it finds it or reaches the end of the chain.',
);
console.log(
  '5. Built-in objects like Arrays and Strings also have prototypes, and we can add our own methods to these prototypes, although it is generally not recommended.',
);
console.log(
  '6. Understanding prototypes and the prototype chain is crucial for mastering JavaScript (effective debugging and development) and its object-oriented features.',
);

////////////////////////////////////////////
// Coding Challenge 1
console.log('--------Coding Challenge 1----------');

// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console
// 4. Create two car objects and test the accelerate and brake methods on them

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate(); // 130
bmw.accelerate(); // 140
bmw.brake(); // 135
bmw.brake(); // 130

mercedes.accelerate(); // 105
mercedes.brake(); // 100
mercedes.brake(); // 95

/////////////////////////////////////////////
// ES6 Classes
console.log('--------ES6 Classes----------');

console.log(
  'Classes are "special functions", but just as with functions, there are two different types of classes: class declarations and class expressions.',
);

// Class expression
// const PersonClExp = class {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   // Instance methods or prototype methods
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }
//   greet() {
//     console.log(`Hello, my name is ${this.fullName}`);
//   }
// };

// Class declaration
class PersonCl {
  // Constructor method
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Getters and Setters
  // Get methods are used to access properties. They are like computed properties.
  // Getters. Get methods are used to access properties.
  get isAdult() {
    return 2037 - this.birthYear >= 18;
  }

  // Set a property that already exists. Set methods are used to validate data before setting a property.
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Instance methods or prototype methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hello, my name is ${this.fullName}`);
  }

  // Static method. Static methods are not available on instances. They are only available on the class itself.
  static hey() {
    console.log('Hey there 👋');
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
jessica.greet();

//getters and setters
console.log(jessica.fullName);
console.log(jessica.isAdult);

// Static method
PersonCl.hey();

//jessica.hey(); // TypeError: jessica.hey is not a function

// 1. Classes are not hoisted. So, we cannot use them before declaring them.
// 2. Classes are first-class citizens. We can pass them as arguments to functions and return them from functions.
// 3. Classes are executed in strict mode. which means we cannot use undeclared variables and other strict mode features.

// Prototypes
console.log(PersonCl.prototype === jessica.__proto__); // true

//Testing
// class EmployeeCl {
//   constructor(id, name, role, startYear) {
//     this.id = id;
//     this.name = name;
//     this.role = role;
//     this.startYear = startYear;
//   }
//   noOfExp() {
//     return new Date().getFullYear() - this.startYear;
//   }
// }
// const ponniah = new EmployeeCl(1023, 'Ponniah', 'Full Stack Developer', 2018);
// console.log(ponniah);
// console.log(ponniah.noOfExp());

/////////////////////////////////////////////
// Object.create
console.log('--------Object.create----------');

console.log(
  'Object.create is another way to create objects and set up prototype inheritance in JavaScript. It allows us to create a new object with a specified prototype object and properties.',
);

// Creating a prototype object
const PersonProto = {
  //Methods of the prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // Method to initialize properties. Even though it looks like a constructor, it is not a constructor function.
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Creating a new object using Object.create method with PersonProto as prototype
const ponniah = Object.create(PersonProto);
console.log(ponniah);

// Initializing properties
ponniah.init('Ponniah', 1996);
ponniah.calcAge();

//Testing
// const EmployeeProto = {
//   init(id, name, role, startYear) {
//     this.id = id;
//     this.name = name;
//     this.role = role;
//     this.startYear = startYear;
//   },
//   noOfExp() {
//     return new Date().getFullYear() - this.startYear;
//   },
// };

// const ponniahProto = Object.create(EmployeeProto);
// ponniahProto.init(1023, 'Ponniah', 'Full Stack Developer', 2018);
// console.log(ponniahProto);
// console.log(ponniahProto.noOfExp());

/////////////////////////////////////////////
// Coding Challenge 2
console.log('--------Coding Challenge 2----------');

// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide km/h by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the mi/h value by 1.6)
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);

console.log(ford);
ford.accelerate();
console.log(`Ford speed in US: ${ford.speedUS} mi/h`);
ford.brake();
console.log(`Ford speed in US: ${ford.speedUS} mi/h`);
ford.speedUS = 50; // setter
console.log(ford);
console.log(`Ford speed in KM: ${ford.speed} km/h`);

/////////////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions
console.log(
  '--------Inheritance Between "Classes": Constructor Functions----------',
);

const Student = function (firstName, birthYear, course) {
  // Inheriting properties from Person constructor function
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

// Adding methods to Student prototype
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

Student.prototype.constructor = Student;

const mike = new Student('Mike', 2020, 'Computer Science');

console.log(mike);

mike.introduce();

// Testing
//constructor function 1
// const Employee = function (id, name, role, startYear) {
//   this.id = id;
//   this.name = name;
//   this.role = role;
//   this.startYear = startYear;
// };
// // add method to Employee prototype
// Employee.prototype.exp = function () {
//   return new Date().getFullYear() - this.startYear;
// };

// //constructor function 2 inheriting from Employee
// const Project = function (id, name, role, startYear, projectName) {
//   Employee.call(this, id, name, role, startYear);
//   this.projectName = projectName;
// };

// // Linking Prototypes. It will link Project prototype to Employee prototype
// Project.prototype = Object.create(Employee.prototype);

// // Adding method to Project prototype
// Project.prototype.projectDetails = function () {
//   console.log(
//     `Employee ${this.name} is currently working on ${this.projectName}`,
//   );
// };

// // Creating new object instance
// const ponniahEmp = new Project(
//   1023,
//   'Ponniah',
//   'Full Stack Developer',
//   2018,
//   'OOP Course',
// );
// console.log(ponniahEmp);
// console.log(`Ponniah has ${ponniahEmp.exp()} years of experience`);
// ponniahEmp.projectDetails();

/////////////////////////////////////////////
// Coding Challenge 3
console.log('--------Coding Challenge 3----------');

// 1. Use a constructor function to implement an Electric Car (called 'EV') as a child class of 'Car'. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property)
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
// 3. Implement an 'accelerate' method that increases the car's speed by 20 km/h and decreases the battery charge by 1%. It then logs a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
// 4. Create an electric car object and test all methods.
// 5. Make sure that the 'accelerate' and 'chargeBattery' methods return 'this', so that they can be chained together
// Test data: 'Tesla' going at 120 km/h, with a charge of 23%

const Car1 = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car1.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/hr`);
};

Car1.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
  return this;
};

const EVCar = function (make, speed, charge) {
  Car1.call(this, make, speed);
  this.charge = charge;
};

// Linking prototypes
EVCar.prototype = Object.create(Car1.prototype);

// Adding methods to EVCar prototype
EVCar.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  return this;
};

// Polymorphism: Overriding accelerate method in EVCar prototype
EVCar.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`,
  );
  return this;
};

EVCar.prototype.constructor = EVCar;

const tesla = new EVCar('Tesla', 120, 23);
console.log(tesla);
tesla.accelerate();

//////////////////////////////////////////

// Inheritance Between "Classes": ES6 Classes
console.log('--------Inheritance Between "Classes": ES6 Classes----------');

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    super.calcAge();
    console.log(`I'm a student and I feel young!`);
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

/////////////////////////////////////////////
// Inheritance Between "Classes": Object.create
console.log('--------Inheritance Between "Classes": Object.create----------');

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const marthaProto = Object.create(StudentProto);
marthaProto.init('Martha', 2012, 'Computer Science');
marthaProto.introduce();
marthaProto.calcAge();

////////////////////////////////////////////
// OOPS Concept with Class Example
console.log('--------OOPS Concept with Class Example----------');

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;
  }

  deposit(val) {
    // Public Interface. We are using deposit method to add money to the account.
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val); // Abstraction. We are using deposit method to withdraw money by passing negative value.
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      // Encapsulation. We are using a private method to approve loan which is not accessible outside the class.
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);
acc1.deposit(250);
acc1.withdraw(100);
acc1.requestLoan(1000);
console.log(acc1);

///////////////////////////////////////////////
// Encapsulation: Private Class Fields and Methods
console.log(
  '--------Encapsulation: Private Class Fields and Methods----------',
);

class Account1 {
  // Public fields (instances)
  locale = navigator.language;

  // Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
  }

  // Public methods
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    }
  }

  // Private Methods
  #approveLoan(val) {
    return true;
  }
}

const Ponniah = new Account1('Ponniah', 'USD', 1234);
console.log(Ponniah);
Ponniah.deposit(500);
Ponniah.withdraw(200);
Ponniah.requestLoan(1000);
console.log(Ponniah.getMovements());

////////////////////////////////////////////////
// Chaining Methods
console.log('--------Chaining Methods----------');

class Account2 {
  // Public fields (instances)
  locale = navigator.language;

  // Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
  }

  // Public methods
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.#movements.push(-val);
    return this; // Returning this to allow method chaining
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
    }
    return this;
  }

  // Private Methods
  #approveLoan(val) {
    return true;
  }
}

const acc2 = new Account2('Ponniah', 'USD', 1234);
acc2.deposit(500).withdraw(200).requestLoan(1000).withdraw(300);
console.log(acc2.getMovements());

///////////////////////////////////////////
// Coding Challenge 4
console.log('--------Coding Challenge 4----------');

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl1 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
}

class EVCl extends CarCl1 {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge}%`,
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().accelerate().brake().chargeBattery(50).accelerate();

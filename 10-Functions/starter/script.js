'use strict';

///////////////////////////////////////
// Default Parameters
console.log('----- Default Parameters -----');
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000);

// const empDetails = function (
//   name = 'Ponniah',
//   id = 1023,
//   role = 'Developer',
//   designation = `My designation is ${role}`
// ) {
//   const emp = {
//     name,
//     id,
//     role,
//     designation,
//   };
//   console.log(emp);
// };

// empDetails();
// empDetails('Arun', 1024, 'Designer', 'My designation is Designer');
// empDetails('Kumar', 1025);
// empDetails(undefined, 1026, 'Manager');

///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
console.log('----- Values vs. Reference -----');
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    console.log('Checked in');
  } else {
    console.log('Wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

// const sampleString = 'Hello World';
// const sampleObject = {
//   greeting: 'Hello World',
// };

// const change = function (str, obj) {
//   str = 'Hello There';
//   obj.greeting = 'Hello There';
// };
// console.log(`Before: ${sampleString}`);
// console.log(`Before: ${sampleObject.greeting}`);
// change(sampleString, sampleObject);
// console.log(`After: ${sampleString}`);
// console.log(`After: ${sampleObject.greeting}`);

///////////////////////////////////////
// Functions Accepting Callback Functions
console.log('----- First-Class and Higher-Order Functions -----');
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);

// const string = 'hello world';
// console.log(string);
// console.log(string.replace(/o/, '').toWellFormed());
// console.log(string[0].toUpperCase() + string.slice(1));
// const split = string.split(' ');
// const uppercase = split[0].toUpperCase();
// console.log(split[0].toUpperCase() + ' ' + split[1]);
// const [firstString, ...otherStrings] = string.split(' ');
// console.log(firstString.toUpperCase() + ' ' + otherStrings.join(' '));
// console.log([firstString.toUpperCase(), ...otherStrings].join(' '));

///////////////////////////////////////
// Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

// Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Jonas');

// const functionReturningFunction = function (param1) {
//   return function (param2) {
//     console.log(`Function with two parameters: ${param1} and ${param2}`);
//   };
// };

// const returnedFunction = functionReturningFunction('First');
// returnedFunction('Second');
// functionReturningFunction('Hello')('World');

///////////////////////////////////////
// The call and apply Methods
console.log('----- The call and apply Methods -----');
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');

// Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

const emp1 = {
  name: 'Ponniah',
  id: 1023,
  role: 'Developer',
  projects: [],
  assignProject(projectName) {
    console.log(`${this.name} is assigned to project ${projectName}`);
    this.projects.push(projectName);
  },
};

const emp2 = {
  name: 'Arun',
  id: 1024,
  role: 'Designer',
  projects: [],
};

emp1.assignProject('RoyalHaskoning');

// we need to create same assignProject method for emp2
// to avoid that we can use call method
const assignProject = emp1.assignProject;

assignProject.call(emp2, 'TSBank Website Redesign');

///////////////////////////////////////
// The bind Method
// book.call(eurowings, 23, 'Sarah Williams');

console.log('----- The bind Method -----');
//bind single arguments
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

// bind multiple arguments
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//set null value if we don't need this keyword
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

// const emp3 = {
//   name: 'Ponniah',
//   id: 1023,
//   role: 'Developer',
//   projects: [],
//   assignProject(projectName) {
//     console.log(`${this.name} is assigned to project ${projectName}`);
//     this.projects.push(projectName);
//   },
// };

// const emp4 = {
//   name: 'Arun',
//   id: 1024,
//   role: 'Designer',
//   projects: [],
// };

// const projectDetails = assignProject.bind(emp4);
// projectDetails('Exact Online EDS Redesign');
// projectDetails('Exact Aurora Corporate News');

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

// console.log(isPrivate);

(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);

//IIFE - Wrap functions declaration as expression and call parenthesis at last. Used to avoid data privacy issue
(function () {
  console.log('Immediately Invoked Function Expression');
})();

///////////////////////////////////////
// Closures
console.log('----- Closures -----');
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    console.log(passengerCount);
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

//console.dir means
console.dir(booker);

// Below code will give error because inner function is trying to access variable which is not in its scope
// const outer = function () {
//   let variable = 5;

//   inner();
// };

// function inner() {
//   console.log('Inner function called');
//   variable++; // Error: variable is not defined in this scope
//   console.log(`Variable value: ${variable}`);
// }

const outer = function () {
  let variable = 5;
  return function () {
    variable++;
    console.log(`Variable value: ${variable}`);
  };
};

// Inner function reated during runtime has access to variable of outer function even after outer function has finished execution
const inner = outer(); //Closure
inner();
inner();
inner();

///////////////////////////////////////
// More Closure Examples
// Example 1
console.log('----- More Closure Examples -----');
let f;
let newVariable;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
  newVariable = 25;
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);
console.log(newVariable);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/
(function () {
  const header = document.querySelector('h1');
  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

// Explanation: The IIFE creates a closure that captures the 'header' variable. When the body is clicked, the event listener's callback function has access to the 'header' variable through the closure, allowing it to change the color of the header without needing to re-select it.

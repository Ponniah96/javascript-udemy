"use strict";

// alert("Welcome to JavaScript Fundamentals - Part 2");

let test = 534; // Reserved keyword error in strict mode
console.log(test);

//Functions
console.log("---- Functions ----");
function logger() {
  console.log("My name is Ponniah");
}

// calling / running / invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const orangeJuice = fruitProcessor(0, 3);
console.log(orangeJuice);

const mixedJuice = fruitProcessor(4, 2);
console.log(mixedJuice);

// Function Declaration vs. Expression
console.log("---- Function Declaration vs. Expression ----");

// Function Declaration
function calcAge1(birthYear) {
  return 2025 - birthYear;
}
const age1 = calcAge1(1996);
console.log(age1);

// Function Expression
const calcAge2 = function (birthYear) {
  return 2025 - birthYear;
};
const age2 = calcAge2(1996);
console.log(age2);

// Arrow Functions
console.log("---- Arrow Functions ----");

const calcAge3 = (birthYear) => 2025 - birthYear;
const age3 = calcAge3(1996);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2025 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years.`;
};

console.log(yearsUntilRetirement(1996, "Ponniah"));
console.log(yearsUntilRetirement(1980, "Alice"));

// Functions Calling Other Functions
console.log("---- Functions Calling Other Functions ----");

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor2(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}

const finalJuice = fruitProcessor2(2, 3);
console.log(finalJuice);

// Reviewing Functions
console.log("---- Reviewing Functions ----");

const calcAge = function (birthYear) {
  return 2025 - birthYear;
};

const yearsUntilRetirement2 = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    return `${firstName} retires in ${retirement} years.`;
  } else {
    return `${firstName} has already retired.`;
  }
};

console.log(yearsUntilRetirement2(1996, "Ponniah"));

//Arrays

console.log("---- Arrays ----");
const friends = ["Michael", "Steven", "Peter"];
console.log(friends);

const years = new Array(1991, 1984, 2008, 2020);
console.log(years);

console.log(friends[0]);

const firstFriend = friends[0];
console.log(firstFriend);

friends[2] = "Jay";
console.log(friends);

// friends = ["Bob", "Alice"] // Error: Assignment to constant variable.

const firstName = "Ponniah";
const ponniah = [firstName, "Kothandaraman", 2025 - 1996, "developer", friends];
console.log(ponniah);

// Exercise
const calcAge4 = function (birthYear) {
  return 2025 - birthYear;
};

const years2 = [1990, 1967, 2002, 2010, 2018];

const ageA = calcAge4(years2[0]);
const ageB = calcAge4(years2[1]);
const ageC = calcAge4(years2[years2.length - 1]);
console.log(ageA, ageB, ageC);

const ages = [
  calcAge4(years2[0]),
  calcAge4(years2[1]),
  calcAge4(years2[years2.length - 1]),
];
console.log(ages);

//Array Methods
console.log("---- Array Methods ----");

const friends2 = ["Michael", "Steven", "Peter"];
console.log(friends2);

// Add elements
const newLength = friends2.push("Jay");
console.log(friends2);
console.log(newLength);

friends2.unshift("John");
console.log(friends2);

// Remove elements
const popped = friends2.pop();
console.log(friends2);
console.log(popped);

friends2.shift();
console.log(friends2);

// IndexOf
console.log(friends2.indexOf("Steven"));
console.log(friends2.indexOf("Bob"));

friends2.push(23);
console.log(friends2.includes("Steven"));
console.log(friends2.includes("Bob"));
console.log(friends2.includes(23));

if (friends2.includes("Steven")) {
  console.log("You have a friend called Steven");
}

// Objects
console.log("---- Objects ----");

const ponniah2 = {
  firstName: "Ponniah",
  lastName: "Kothandaraman",
  age: 2025 - 1996,
  job: "developer",
  friends: ["Michael", "Steven", "Peter"],
};

console.log(ponniah2);
console.log(ponniah2.lastName);
console.log(ponniah2["lastName"]);

const nameKey = "Name";
console.log(ponniah2["first" + nameKey]);
console.log(ponniah2["last" + nameKey]);

const interestedIn = prompt(
  "What do you want to know about Ponniah? Choose between firstName, lastName, age, job, and friends"
);

// console.log(ponniah2.interestedIn); // undefined

if (ponniah2[interestedIn]) {
  console.log(ponniah2[interestedIn]);
} else {
  console.log(
    "Wrong request! Choose between firstName, lastName, age, job, and friends"
  );
}

ponniah2.location = "India";
ponniah2["twitter"] = "@ponniah";
console.log(ponniah2);

// Challenge
console.log(
  `${ponniah2.firstName} has ${ponniah2.friends.length} friends, and his best friend is called ${ponniah2.friends[0]}`
);

const ponniah3 = {
  firstName: "Ponniah",
  lastName: "Kothandaraman",
  birthYear: 1996,
  job: "developer",
  friends: ["Michael", "Steven", "Peter"],
  hasDriversLicense: true,
  calcAge: function () {
    this.age = 2025 - this.birthYear;
    return this.age;
  },
  getSummary: function () {
    return `Hi, I'm ${
      this.firstName
    } and I'm a ${this.calcAge()} years old. I'm ${
      this.hasDriversLicense ? "having a" : "having not a"
    } driving license`;
  },
};

console.log(ponniah3.calcAge());
console.log(ponniah3.getSummary());

// for Loop
console.log("---- for Loop ----");

for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♂️`);
}

// Looping Arrays, Breaking and Continuing
console.log("---- Looping Arrays, Breaking and Continuing ----");

const ponniahArray = [
  "Ponniah",
  "Kothandaraman",
  2025 - 1996,
  "developer",
  ["Michael", "Steven", "Peter"],
  true,
];

const types = [];

for (let i = 0; i < ponniahArray.length; i++) {
  console.log(ponniahArray[i], typeof ponniahArray[i]);

  // Filling types array
  types.push(typeof ponniahArray[i]);
}

console.log(types);

const years3 = [1991, 2007, 1969, 2020];
const ages2 = [];

for (let i = 0; i < years3.length; i++) {
  ages2.push(2025 - years3[i]);
}
console.log(ages2);

// Continue and Break
console.log("---- Continue and Break ----");

console.log("---- Only Strings ----");
for (let i = 0; i < ponniahArray.length; i++) {
  if (typeof ponniahArray[i] !== "string") continue;

  console.log(ponniahArray[i], typeof ponniahArray[i]);
}

console.log("---- Breaking at Number ----");
for (let i = 0; i < ponniahArray.length; i++) {
  if (typeof ponniahArray[i] === "number") break;

  console.log(ponniahArray[i], typeof ponniahArray[i]);
}

// Looping Backwards and Loops in Loops
console.log("---- Looping Backwards and Loops in Loops ----");

const ponniahArray2 = [
  "Ponniah",
  "Kothandaraman",
  2025 - 1996,
  "developer",
  ["Michael", "Steven", "Peter"],
];

for (let i = ponniahArray2.length - 1; i >= 0; i--) {
  console.log(i, ponniahArray2[i]);
}

for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`---- Starting exercise ${exercise} ----`);

  for (let rep = 1; rep <= 5; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♂️`);
  }
}

// The while Loop
console.log("---- The while Loop ----");

let rep = 1;
while (rep <= 10) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♂️`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log("Loop is about to end...");
}

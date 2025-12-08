// alert("Hello, world!");

console.log(23+10+13-19);

let firstName ="Ponniah";
console.log(firstName);

let PI = 3.1415;
console.log(PI);

let myFirstJob = "Programmer";
let myCurrentJob = "Teacher";
console.log(myFirstJob);
console.log(myCurrentJob);

let job1 = "Programmer";
let job2 = "Teacher";
console.log(job1);
console.log(job2);

let $function = 27;
console.log($function);

let years40 = 40;
console.log(years40);

let isBoolean = true;
console.log(isBoolean);

let undefinedVar;
console.log(undefinedVar);

console.log(typeof isBoolean);
console.log(typeof years40);
console.log(typeof firstName);
console.log(typeof undefinedVar);

// Note: The above code is for demonstration purposes only.

let age = 30;
age = 31;

const birthYear = 1993;
// birthYear = 1994; // This will cause an error

var job = "Programmer";
job = "Teacher";  

console.log(age);
console.log(birthYear);
console.log(job);

const now = 2024;
const agePonniah = now - 1993;
const ageSarah = now - 2018;
console.log(agePonniah, ageSarah);

console.log(agePonniah * 2, agePonniah / 10, 2 ** 3);

const firstName2 = "Ponniah";
const lastName2 = "Kumar";
console.log(firstName2 + " " + lastName2);

let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1 = 101
x--; // x = x - 1 = 100
console.log(x);

const isFullAge = age >= 18;
console.log(isFullAge);

console.log(now - 1993 > now - 2018);

// Order of operations
console.log("Order of operations:");
let z, y;
z = y = 25 - 10 - 5; // z = y = 10
console.log(z, y);

const averageAge = (agePonniah + ageSarah) / 2;
console.log(agePonniah, ageSarah, averageAge);

//String literals and template literals
console.log("String literals and template literals:");
const firstName3 = "Ponniah";
const job3 = "Teacher";
const birthYear3 = 1993;
const year3 = 2024;

const ponniah =
  "I'm " + firstName3 + ", a " + (year3 - birthYear3) + " year old " + job3 + "!";
console.log(ponniah);

const ponniahNew = `I'm ${firstName3}, a ${year3 - birthYear3} year old ${job3}!`;
console.log(ponniahNew);

console.log(`Just a regular string...`);

console.log(
  `String with
multiple
lines`
);

console.log(
  "String with\n" +
    "multiple\n" +
    "lines"
);  


//if-else statements
console.log("if-else statements:");
const age2 = 15;

if (age2 >= 18) {
  console.log("Sarah can start driving license 🚗");
} else {
  const yearsLeft = 18 - age2;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear4 = 2012;
let century;
if (birthYear4 <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

//type conversion and coercion
console.log("type conversion");
const inputYear = "1993";
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number("Ponniah"));
console.log(typeof NaN);

console.log(String(23), 23);

//type coercion
console.log("type coercion:");
console.log("I am " + 23 + " years old");
console.log("23" - "10" - 3);


//falsy values: 0, '', undefined, null, NaN
console.log("Falsy values:");
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Ponniah"));
console.log(Boolean({}));

const money = 0;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log("You should get a job!");
}

let height;
if (height) {
  console.log("Height is defined");
} else {
  console.log("Height is undefined");
} 

//Equality operators: == vs. ===
console.log("Equality operators:");
const age3 = 18;
if (age3 === 18) console.log("You just became an adult (strict)");

if (age3 == 18) console.log("You just became an adult (loose)");

const favorite = Number(prompt("What's your favorite number?"));
console.log(favorite);
console.log(typeof favorite);

if (favorite === 23) { 
   console.log("Cool! 23 is an amazing number!");
} else if (favorite === 7) {
  console.log("7 is also a cool number!");
} else {
  console.log("Number is not 23 or 7");
}
if (favorite !== 23) console.log("Why not 23?");

//Logical operators
console.log("Logical operators:");
const hasDriverLicense = true; // A
const hasGoodVision = true; // B

console.log(hasDriverLicense && hasGoodVision);
console.log(hasDriverLicense || hasGoodVision);
console.log(!hasDriverLicense);

if (hasDriverLicense && hasGoodVision) {
   console.log("Sarah is able to drive!");
} else {
   console.log("Someone else should drive...");
}


//The switch statement
console.log("The switch statement:");
const day = "monday";

switch (day) {
  case "monday":
    console.log("Plan course structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday":
    console.log("Prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("Write code examples");
    break;
  case "friday":
    console.log("Record videos");
    break;
  case "saturday":
  case "sunday":
    console.log("Enjoy the weekend!");
    break;
  default:
    console.log("Not a valid day!");
}

//statements and expressions
console.log("statements and expressions:");
3 + 4;
1991;
true && false && !false;

if (23 > 10) {
  const str = "23 is bigger"; // expression
  console.log(str);
}

//The conditional (ternary) operator
console.log("The conditional (ternary) operator:");
const age4 = 23;
// age4 >= 18 ? console.log("I like to drink wine 🍷") : console.log("I like to drink water 💧" );
const drink = age4 >= 18 ? "wine 🍷" : "water 💧";
console.log(drink);

let drink2;
if (age4 >= 18) {
  drink2 = "wine 🍷";
} else {
  drink2 = "water 💧";
} 
console.log(drink2);

console.log(`I linke to drink ${age4 >=18 ? "wine 🍷" : "water 💧"}`);

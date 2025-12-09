// Remember, we're gonna use strict mode in all scripts now!
"use strict";

let firstName = "Ponniah";
console.log(firstName);
console.log(firstName);

// Problem 1: Calculate the temperature amplitude given an array of temperatures
// 1) Understanding the problem
// - What is temperature amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what to do about it?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

const temperature = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== "number") continue;
    if (temps[i] > max) max = temps[i];
    if (temps[i] < min) min = temps[i];
  }
  return max - min;
};

console.log(`Temp Amplitude: ${calcTempAmplitude(temperature)}`);
// Problem 2: Function should now receive 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? No! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== "number") continue;
    if (temps[i] > max) max = temps[i];
    if (temps[i] < min) min = temps[i];
  }
  return max - min;
};

console.log(
  `Temp Amplitude New: ${calcTempAmplitudeNew([3, 5, 1], [9, 0, 5])}`
);

// Debugging
const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",
    // C) FIX THE BUG
    // value: Number(prompt("Degrees celsius:")),
    value: 10,
  };

  // B) FIND THE BUG
  console.table(measurement);

  //   console.log(measurement.value);
  const kelvin = measurement.value + 273;
  return kelvin;
};

// A) IDENTIFY THE BUG
console.log(`Kelvin is ${measureKelvin()}`);

// Using a debugger
const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    debugger;
    if (typeof temps[i] !== "number") continue;
    if (temps[i] > max) max = temps[i];
    if (temps[i] < min) min = temps[i];
  }
  return max - min;
};

console.log(
  `Temp Amplitude Bug: ${calcTempAmplitudeBug([3, 5, 1], [9, 4, 5])}`
);

//Create array of objects with employee records to display different console methods

const employees = [
  { name: "Alice", position: "Developer" },
  { name: "Bob", position: "Designer" },
  { name: "Charlie", position: "Manager" },
];

console.table(employees);

// create employee object
const employee = {
  name: "David",
  position: "Intern",
  age: 22,
};

// log employee object as table
console.table(employee);
console.log(employee);
console.warn(employee);
console.error(employee);
console.info(employee);
console.debug(employee);
console.trace(employee);
console.time(employees);

// Coding Challenge: Temperature Forecast
// Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.
// Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."
const printForecast = function (temps) {
  let str = "... ";
  for (let i = 0; i < temps.length; i++) {
    str += `${temps[i]}ºC in ${i + 1} days ... `;
  }
  console.log(str);
};

console.log("Temperature Forecast Test:");
printForecast([17, 21, 23]);
printForecast([12, 5, -5, 0, 4]);

//Coding Challenge with AI: Number of wroking days for freelancer
// Given an array representing the number of hours worked each day in a week,
// write a function that calculates the total number of working days (days with more than 0 hours worked) in that week.
// Example: [8, 0, 6, 7, 0, 5, 0] will return 4 working days.

const countWorkingDays = function (hours) {
  let workingDays = 0;
  for (let i = 0; i < hours.length; i++) {
    if (hours[i] > 0) workingDays++;
  }
  return workingDays;
};

console.log("Working Days Test:");
console.log(countWorkingDays([8, 0, 6, 7, 0, 5, 0])); // Output: 4
console.log(countWorkingDays([0, 0, 0, 0, 0, 0, 0])); // Output: 0
console.log(countWorkingDays([4, 5, 6, 7, 8, 9, 10])); // Output: 7

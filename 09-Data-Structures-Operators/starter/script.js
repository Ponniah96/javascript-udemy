'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

//Object literal representing a restaurant
const weekdays1 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours11 = {
  [weekdays1[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays1[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays1[5]]: {
    open: 0,
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //ES6 enhanced object lierals
  openingHours11,

  //Before ES6
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDelivery: function ({ time, address, mainIndex, starterIndex }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ingrediant1, ingrediant2, ingrediant3) {
    console.log(
      `Here is your delicious pasta with ${ingrediant1}, ${ingrediant2} and ${ingrediant3}`
    );
  },
  orderPizza: function (mainIngrediant, ...otherIngrediants) {
    console.log(mainIngrediant);
    console.log(otherIngrediants);
  },
};

///////////////////////////////////////
// Destructuring Arrays
console.log('--- Destructuring Arrays ---');
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

///////////////////////////////////////
// Destructuring Objects
console.log('--- Destructuring Objects ---');

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Rename variables
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a1 = 111;
let b1 = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a: a1, b: b1 } = obj);
console.log(a1, b1);

// Nested objects
const {
  fri: { open: o, close: c1 },
} = openingHours;
console.log(o, c1);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

///////////////////////////////////////
// The Spread Operator (...)
console.log('--- The Spread Operator (...) ---');

//Default merging method
const arr2 = [7, 8, 9];
const badNewArr = [1, 2, arr2[0], arr2[1], arr2[2]];
console.log(badNewArr);

//Spread Operator
const newArr = [1, 2, ...arr2];
console.log(newArr);

console.log(...newArr); // 1 2 7 8 9
console.log(1, 2, 7, 8, 9);

// Create new menu array which add new item to main menu
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu2);

// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
// console.log(`${...str} Schmedtmann`);

// Real-world example
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3'),
  // prompt('Pizza ingredients 1: '),
  // prompt('Pizza ingredients 2: '),
  // prompt('Pizza ingredients 3: '),
];
console.log(ingredients);

// Ways to pass arguments to function
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients); // More practical way

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

///////////////////////////////////////
// Rest Pattern and Parameters
console.log('--- Rest Pattern and Parameters ---');

// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arr3 = [1, 2, ...[3, 4]];

// REST, because on LEFT side of =
const [a3, b3, ...others] = [1, 2, 3, 4, 5];
console.log(a3, b3, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x1 = [23, 5, 7];
add(...x1);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

///////////////////////////////////////
// Short Circuiting (&& and ||)
console.log('--- Short Circuiting (&& and ||) ---');

//Falsy values: 0 ,'', undefined, null, NaN, false

// OR operator
console.log('---- OR ----');
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// AND operator
console.log('---- AND ----');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'jonas');

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

let a6 = '';

console.log(`Using ternary operator: ${a6 ? a6 : 'No value'}`);
console.log(`Using OR operator: ${a6 || 'No value'}`);
console.log(`Using AND operator: ${a6 && 'No value'}`);

///////////////////////////////////////
// The Nullish Coalescing Operator (??)
console.log('--- The Nullish Coalescing Operator (??) ---');

restaurant.numGuests = 0;
const guests3 = restaurant.numGuests ?? 10;
console.log(guests3);

let a7 = null;
console.log(`Nullish Operator Value  ${a7 ?? 'Null or undefined'}`);

///////////////////////////////////////
// Logical Assignment Operators
console.log('--- Logical Assignment Operators ---');
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);

const obj3 = {
  fname: 'Ponniah',
  age: 26,
};

const obj4 = {
  fname: 'Kumar',
  birthYear: 1998,
};

//Logical OR Assignment Operator
obj3.age ||= 30;
obj3.birthYear ||= 2000;
obj4.age ||= 35;

//Logical AND Assignment Operator
obj3.fname &&= '---ANONYMOUS---';
obj4.fname &&= '---ANONYMOUS---';
obj4.location = obj4.location && '---UNKNOWN---';
obj3.location &&= '---UNKNOWN---';

console.log(obj3);
console.log(obj4);

///////////////////////////////////////
// Coding Challenge #1
console.log('--- Coding Challenge #1 ---');
/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// Task1: Create one player array for each team (variables 'players1' and 'players2')

//const [player1, player2] = [game.players[0][0], game.players[1][0]];
const [players1, players2] = game.players;
console.log(players1, players2);

// Task2: The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players

// const [gk, ...fieldPlayers] = game.players[0];
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//Task3: Create an array 'allPlayers' containing all players of both teams (22 players)

// const [...allPlayer] = [...game.players[0], ...game.players[1]];
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//Task4: During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// const [...players1Final] = [
//   ...game.players[0],
//   'Thiago',
//   'Coutinho',
//   'Perisic',
// ];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//Task5: Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')

const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

//Task6: Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)

// const printGoals = function (playerName) {
//   let count = 0;
//   for (let i = 0; i < game.scored.length; i++) {
//     if (playerName == game.scored[i]) count += 1;
//   }
//   console.log(`${playerName} scored ${count} goals`);
// };

// printGoals('Davies');
// printGoals('Muller');
// printGoals('Lewandowski');
// printGoals('Kimmich');

const printGoals = function (...playerNames) {
  console.log(`${playerNames.length} goals were scored in total`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// Task7: The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// console.log(`${team1 < team2 ? game.team1 : game.team2} is more likely to win`);

// console.log(`${team1 < team2 && game.team1}`);
// console.log(`${team2 < team1 && game.team2}`);

team1 < team2 && console.log(`${game.team1} is more likely to win`);
team2 < team1 && console.log(`${game.team2} is more likely to win`);

///////////////////////////////////////
// The for-of Loop
console.log('--- The for-of Loop ---');
const menu3 = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu3) console.log(item);

for (const [i, el] of menu3.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// console.log([...menu.entries()]);

// const arr4 = [10, 20, 30];
// for (const item of arr4) {
//   console.log(item);
// }
// console.log(arr4);
// console.log(arr4.entries());
// console.log(...arr4.entries());

// const [inde, d] = [...arr4.entries()];
// console.log(inde, d);

///////////////////////////////////////
// Object Lierals Enhancements
console.log('--- Object Lierals Enhancements ---');
//Check openingHours11 object at the top of the file
//Before ES6
const fname = 'Ponniah';
const age = 26;

const person = {
  fname: fname,
  age: age,
  greet: function () {
    console.log(
      `Hello, my name is ${this.fname} and I am ${this.age} years old.`
    );
  },
};

console.log(`Before: ${person.fname} is ${person.age} years old.`);

//ES6 Enhanced Object Literals
const person1 = {
  fname,
  age,
  //Method without 'function' keyword
  greet() {
    console.log(
      `Hello, my name is ${this.fname} and I am ${this.age} years old.`
    );
  },
};

console.log(`After: ${person1.fname} is ${person1.age} years old.`);
person1.greet();

///////////////////////////////////////
// Optional Chaining
console.log('--- Optional Chaining ---');
// console.log(restaurant.openingHours.mon);
// console.log(restaurant.openingHours.mon.open);

//  Without optional chaining
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.orderPasta?.('1', '2', '3') ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];

console.log(users[0]?.name ?? 'User array empty');

if (users.length > 0) console.log(users[0].name);
else console.log('user array empty');

const optionalChaningMethod = {
  fname: 'Ponniah',
  age: 26,
  greet(str) {
    console.log(
      `Hello, my name is ${this.fname} and I am ${this.age} years old. ${str}`
    );
    return 'Greet Method Executed';
  },
};

console.log(optionalChaningMethod?.fname ?? 'Ponniah Kothandaraman');
console.log(
  optionalChaningMethod?.greet?.('hi') ?? 'Greet Method does not exist'
);

///////////////////////////////////////
// Looping Objects: Object Keys, Values, and Entries
console.log('--- Looping Objects: Object Keys, Values, and Entries ---');
// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
// console.log(entries);

// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

const employeeList = {
  emp1: { name: 'Alice', age: 30 },
  emp2: { name: 'Bob', age: 25 },
  emp3: { name: 'Charlie', age: 35 },
};

//Get Key values
const empKeys = Object.keys(employeeList);
console.log(empKeys);

for (const emp of empKeys) {
  console.log(emp);
}

//Extract Values
const empValues = Object.values(employeeList);
console.log(empValues);

for (const emp of empValues) {
  console.log(`Individual Employee Details: ${emp.name}, ${emp.age}`);
}

// Extract Both Keys and Values
const empEntries = Object.entries(employeeList);
console.log(empEntries);

console.log('Employee Details using traditional for loop:');
for (const empDetails of empEntries) {
  console.log(
    `${empDetails[0]}: Name is ${empDetails[1].name}, Age is ${empDetails[1].age}`
  );
}

console.log('Employee Details using destructuring:');
for (const [id, { name, age }] of empEntries) {
  console.log(` ${id}: Name is ${name}, Age is ${age}`);
}

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

for (const [goalNo, scorer] of game.scored.entries()) {
  console.log(`Goal ${goalNo + 1}: ${scorer}`);
}

//Task 2: Calculate average

let sum = 0;
for (let value of Object.values(game.odds)) {
  sum += value;
}
//const average = sum / 3;
const average = sum / Object.values(game.odds).length;
console.log(`Average of Odds: ${average}`);

//task 3: Print the 3 odds to the console, but in a nice formatted way
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

///////////////////////////////////////
// Sets
console.log('--- Sets ---');

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Jonas'));

// Size of set
console.log(ordersSet.size);
// Check for item
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
// Add item
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
// Delete item
ordersSet.delete('Risotto');
// Clear set
// ordersSet.clear();
console.log(ordersSet);

// Looping through set
for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
//Using spread operatot to convert set to array
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

console.log(new Set('jonasschmedtmann').size);

// const arr7 = ['hi', 'hello', 'hi', 'greetings', 'hello'];

// //Return unique values
// const uniquevalues = new Set(arr7);
// console.log(uniquevalues);

// //covert set into array
// const uniqueArray = [...uniquevalues];
// console.log(uniqueArray);

// //Using Set we can access values because it is also iterable
// console.log(uniquevalues.size);

// //Add Elements in set

// uniquevalues.add('hey');

// //Delete Elements in set
// uniquevalues.delete('greetings'); // We can delete any elemets

// //Iterate Set values

// for (let individualValues of uniquevalues) console.log(individualValues);

// //check any specific value
// console.log(uniquevalues.has('hello'));

// //clear all set values
// uniquevalues.clear();

///////////////////////////////////////
// New Operations to Make Sets Useful!

console.log('--- New Operations to Make Sets Useful! ---');
const italianFood = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFood = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

const commonFoods = italianFood.intersection(mexicanFood);
console.log('Intersection:', commonFoods);
console.log([...commonFoods]);

const italianMexicanFusion = italianFood.union(mexicanFood);
console.log('Union:', italianMexicanFusion);

console.log([...new Set([...italianFood, ...mexicanFood])]);

const uniqueItalianFoods = italianFood.difference(mexicanFood);
console.log('Difference italian', uniqueItalianFoods);

const uniqueMexicanFoods = mexicanFood.difference(italianFood);
console.log('Difference mexican', uniqueMexicanFoods);

const uniqueItalianAndMexicanFoods =
  italianFood.symmetricDifference(mexicanFood);
console.log(uniqueItalianAndMexicanFoods);

console.log(italianFood.isDisjointFrom(mexicanFood));

///////////////////////////////////////
// Maps: Fundamentals
console.log('--- Maps: Fundamentals ---');
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();

const arr5 = [1, 2];
rest.set(arr5, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr5));

const empDetils = new Map();
empDetils.set('fname', 'Ponniah');
empDetils.set('age', 26);
empDetils.set(1, 'India');
console.log(empDetils.get('fname'));
console.log(empDetils.size);
///////////////////////////////////////
// Maps: Iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Option ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2.
gameEvents.delete(64);

// 3.
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
const times = [...gameEvents.keys()].pop();
console.log(times);
console.log(
  `An event happened, on average, every ${times / gameEvents.size} minutes`
);

// 4.
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}

///////////////////////////////////////
// Working With Strings - Part 1
console.log('--- Working With Strings - Part 1 ---');
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' '))); //Get first word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //Get last word

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas'));
console.log(typeof new String('jonas'));

console.log(typeof new String('jonas').slice(1));

//////////////////////////////////////
// Working With Strings - Part 2

console.log('--- Working With Strings - Part 2 ---');
const airlines = 'TAP Air Portugal';

console.log(airlines.toLowerCase());
console.log(airlines.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));

// Alternative solution to replaceAll with regular expression
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const planes = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Airb'));

if (planes.startsWith('Airbus') && planes.endsWith('neo')) {
  console.log('Part of the NEW ARirbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

///////////////////////////////////////
// Working With Strings - Part 3

console.log('--- Working With Strings - Part 3 ---');
// Split and join
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));

// Repeat
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

//String methods we used above are
//length
//indexOf, lastIndexOf
//slice
//toLowerCase, toUpperCase
//trim
//replace, replaceAll
//includes, startsWith, endsWith
//split, join
//padStart, padEnd
//repeat

///////////////////////////////////////
// Coding Challenge #4

/*Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

const challenge = document.querySelector('#challenge');
challenge.innerHTML = `<textarea id="input" rows="10" cols="30"></textarea>
<br>
<button id="btn" style="padding:10px;display:block;margin-top:10px;width:150px;height:50px">Change</button>`;

document.querySelector('#btn').addEventListener('click', function () {
  const text = document.querySelector('#input').value;
  //console.log(text);
  const rows = text.split('\n');
  //console.log(rows);

  for (const [i, row] of rows.entries()) {
    // console.log(row);
    const [first, second] = row.toLowerCase().trim().split('_');
    //console.log(first, second);
    const output = first + second.replace(second[0], second[0].toUpperCase());
    console.log(output);
    // console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});

///////////////////////////////////////
// String Methods Practice

const flightss =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flightss.split('+')) {
  const [type, from, to, time] = flight.split(';'); //spliting each flight details
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(46);
  console.log(output);
}

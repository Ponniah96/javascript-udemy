'use strict';

//Prerequisite: Modern and Clean Code Best Practices
// 1. Use const and let instead of const: Always declare constiables using const for values that won't change and let for values that will change. Avoid using const, as it has function scope and can lead to unexpected behavior.
// 2. Use arrow functions: Arrow functions provide a more concise syntax and lexically bind the this keyword, making them a better choice for most functions.
// 3. Use template literals: Template literals allow for easier string interpolation and multi-line strings, improving readability.
// 4. Use destructuring: Destructuring allows you to extract values from arrays or objects into distinct constiables, making your code cleaner and more readable.
// 5. Use default parameters: Default parameters allow you to set default values for function parameters, reducing the need for additional checks and improving code clarity.
// 6. Use spread and rest operators: The spread operator allows you to expand arrays or objects, while the rest operator allows you to collect multiple elements into an array. Both can help simplify your code and make it more readable.
// 7. Avoid global constiables: Global constiables can lead to conflicts and make your code harder to maintain. Instead, use modules or closures to encapsulate your code and avoid polluting the global namespace.
// 8. Use strict mode: Strict mode helps catch common coding mistakes and prevents the use of certain features that can lead to bugs. Always use 'use strict' at the beginning of your JavaScript files or functions.
// 9. Write modular code: Break your code into smaller, reusable modules that can be easily maintained and tested. This promotes separation of concerns and makes your code more organized.
// 10. Use meaningful constiable and function names: Choose descriptive names for your constiables and functions that clearly indicate their purpose. This improves readability and makes it easier for others (or yourself in the future) to understand the code.

// Summary of Best Practices:
// 1. Use const and let instead of var for variable declarations to ensure block scope and prevent accidental reassignments.
// 2. set descriptive variable and function names to improve code readability and maintainability. Eg: budget, spendingLimits, addExpense, checkLimits, bigExpenses
// 3. Replace if-else statements with ternary operators or short-circuiting where appropriate to make the code more concise and easier to read.
// 4. Use DRY principle (Don't Repeat Yourself) to avoid code duplication and improve maintainability. Create helper functions to encapsulate common logic and reuse them throughout the code.
// 5. Use modern JavaScript features like optional chaining and nullish coalescing operator to handle undefined values gracefully and simplify code.

// Summary of Functional Programming Principles:
// 1. Pure Functions: A pure function is a function that always produces the same output for the same input and has no side effects. It does not modify any external state or rely on any external data. Pure functions are easier to test and reason about, as they do not have hidden dependencies or side effects.
// 2. Higher-Order Functions: Higher-order functions are functions that can take other functions as arguments or return functions as their result. They allow for greater flexibility and abstraction in code, enabling you to create reusable and composable functions.
// 3. Immutability: Immutability is the concept of creating new data structures instead of modifying existing ones. This helps prevent unintended side effects and makes it easier to reason about the state of your application. Instead of changing an object or array directly, you create a new one with the desired changes.

/*

const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
  ];
  
const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

 Below array declarrations are allow to use mutable functions. 
 Object.freeze() can be used to make them immutable, but for the sake of this example, we will keep them mutable to demonstrate the functional programming principles.

*/

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// Use DRY Principle (Don't Repeat Yourself) to avoid code duplication and improve maintainability.
// For example, instead of repeating the logic to check spending limits in multiple places, we can create a helper function that encapsulates this logic and can be reused throughout the code.
// const checkSpendingLimit = function(user){
//   return spendingLimits?.[user] ?? 0; // Optional chaining and nullish coalescing operator
// }
// This is further simplified by using arrow function syntax and implicit return, making the code more concise and easier to read.
const getLimit = (limits, user) => limits?.[user] ?? 0; // Optional chaining and nullish coalescing operator

/* Impure Functions:
// Above addExpense function is an impure function because it modifies the budget array, which is an external state.
// It also relies on the spendingLimits object, which is another external state.
// This can lead to unintended side effects and makes it harder to test and reason about the function's behavior.

const addExpense = function (value, description, user = 'jonas') {
  // if (!user) user = 'jonas'; // This is replaced by above default parameter in function signature
  user = user.toLowerCase();

  let limit;
  // if (spendingLimits[user]) {
  //   limit = spendingLimits[user];
  // } else {
  //   limit = 0;
  // }
  // This is replaced by below ternary operator
  //limit = spendingLimits[user] ? spendingLimits[user] : 0;
  // This is further simplified by calling common function checkSpendingLimit which uses optional chaining and nullish coalescing operator to handle undefined values gracefully.
  limit = checkSpendingLimit(user);

  // if (value <= limit) {
  //   budget.push({ value: -value, description: description, user: user }); //Modifies original array
  // }
  // This is replaced by below short-circuiting
  // value <= limit && budget.push({ value: -value, description: description, user: user });
  // This is further simplified by using object property value shorthand and enhanced object literals
  // Object property value shorthand allows us to omit the value if the property name is the same as the variable name.
  // Enhanced object literals allow us to use computed property names and method definitions in objects, making our code cleaner and more concise.
  value <= limit && budget.push({ value: -value, description, user });
};
addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);
*/

// Pure Functions
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas',
) {
  const correctUser = user.toLowerCase();
  let limit;
  limit = getLimit(limits, correctUser);
  return (
    value <= limit && [
      ...state,
      { value: -value, description, user: correctUser },
    ]
  ); // Returns a new array with the new expense added, without modifying the original budget array.
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
console.log('addExpense: ', newBudget1);

/* Impure Functions:
// The checkLimits function is an impure function because it modifies the budget array by adding a flag property to certain elements based on the spending limits. 
// This can lead to unintended side effects and makes it harder to test and reason about the function's behavior.

const checkLimits = function () {
  for (const el of budget) {
    let limit;
    // if (spendingLimits[el.user]) {
    //   limit = spendingLimits[el.user];
    // } else {
    //   limit = 0;
    // }
    // This is replaced by below ternary operator
    // limit = spendingLimits[el.user] ? spendingLimits[el.user] : 0;
    // This is further simplified by calling common function checkSpendingLimit which uses optional chaining and nullish coalescing operator to handle undefined values gracefully.
    limit = getLimit(el.user);

    // if (el.value < -limit) {
    //   el.flag = 'limit';
    // }
    // This is replaced by below short-circuiting
    el.value < -limit && (el.flag = 'limit');
  }
};
checkLimits();
*/

//Pure Functions: Use map function we create new array with flag property.
// Doesn't mutate old array
const checkLimits = function (state, limits) {
  // for (const el of state) {
  //   let limit;
  //   limit = getLimit(limits, el.user);
  //   el.value < -limit && (el.flag = 'limit');
  // }
  // This is further simplified by using map method to create a new array with the flag property added to certain elements based on the spending limits, without modifying the original budget array.
  return state.map(el => {
    const limit = getLimit(limits, el.user);
    return el.value < -limit ? { ...el, flag: 'limit' } : el;
    // Returns a new object with the flag property added if the condition is met,
    //  otherwise returns the original object.
  });
};
const newBudget2 = checkLimits(newBudget1, spendingLimits);
console.log('checkLimits: ', newBudget2);

/* Impure Functions:
// The bigExpenses function is an impure function because it relies on the budget array, which is an external state, to generate the output string. 
// It also modifies the output variable by concatenating strings to it, which can lead to unintended side effects and makes it harder to test and reason about the function's behavior.
const bigExpenses = function (bigLimit) {
  let output = '';
  for (const el of budget) {
    // if (el.value <= -bigLimit) {
    //   output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
    // }
    // This is replaced by below short-circuiting
    el.value <= -bigLimit && (output += el.description.slice(-2) + ' / '); // Emojis are 2 chars
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
bigExpenses(1000);
*/

// Pure Functions: Use filter and map functions to create a new string with the descriptions of big expenses,
//  without modifying any external state.
const bigExpenses = function (state, bigLimit) {
  return state
    .filter(el => el.value <= -bigLimit)
    .map(el => el.description.slice(-2)) // Emojis are 2 chars
    .join(' / '); // Join the descriptions with ' / ' separator
};
const bigExpenseString = bigExpenses(newBudget2, 1000);
console.log('bigExpenses: ', bigExpenseString);

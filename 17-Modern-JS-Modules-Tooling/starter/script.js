// Javascript Modules and Tooling
console.log('JavaScript Modules and Testing');

console.log('Importing Modules in script.js');

// Importing Modules
// Importing Individual Modules
// import { addToCart } from './shoppingCart.js';
// addToCart('bread', 5);

// // Importing All Modules
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

// // Importing everything
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

//////////////////////////////////////////
// Test
// import shippingCost from './shoppingCart.js';
// console.log(shippingCost); //retrun default export value

// import { shippingCost } from './shoppingCart.js';
// console.log(shippingCost); //retrun shippingcost value

// import { shippingCost, totalPrice } from './shoppingCart.js';
// console.log(shippingCost, totalPrice); //return 10, 237

// import { shippingCost, totalPrice as price } from './shoppingCart.js';
// console.log(shippingCost, price); //return 10, 237

// import * as ShoppingCart from './shoppingCart.js';
// console.log(ShoppingCart.totalPrice); //return all the exported values as an object

//////////////////////////////////////////
// Default Imports
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
console.log(cart);

//////////////////////////////////////////////////
// Top-Level Await

// Simple Example
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

// Real Example
async function getLastPost() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
}

// const lastPost2 = getLastPost();
// console.log(lastPost2); //return promise
// lastPost2.then(last => console.log(last)); //return the resolved value of the promise, but not in clean way

const lastPost = await getLastPost();
console.log(lastPost);

//Summary
// 1. Modules are reusable pieces of code that can be exported from one file and imported into another.
// 2. Named exports allow you to export multiple values from a module, while default exports allow you to export a single value.
// 3. Top-level await allows you to use the await keyword outside of an async function, making it easier to work with asynchronous code in modules.

//////////////////////////////////////////////////////
// Module Pattern
console.log('=============Module Pattern =================');

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const quantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`,
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    quantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
//Test
// const employeeDetailsModulePattern = (function () {
//   const empName = 'Ponniah Kothandaraman';
//   const companyDetails = [];
//   const technologies = ['JavaScript', 'React', 'Node.js'];

//   const addCompanyDetails = function (company, role) {
//     companyDetails.push({ company, role });
//     console.log(`${empName} joined as ${role} at ${company}`);
//     // empName is not acessible outside module, but it is accessible due to closure,
//     // because addCompanyDetails function is a closure that has access to the variables in the outer scope of the module pattern.
//   };

//   return {
//     companyDetails,
//     technologies,
//     addCompanyDetails,
//   };
// })();

// employeeDetailsModulePattern.addCompanyDetails('Google', 'Software Engineer');
// employeeDetailsModulePattern.addCompanyDetails(
//   'Facebook',
//   'Senior Software Engineer',
// );
// console.log(employeeDetailsModulePattern);

////////////////////////////////////////////////// CommonJS Modules
// In CommonJS, we use require() to import modules and module.exports to export them.
// This is commonly used in Node.js environments.

// Example of CommonJS Module
// const { addToCart } = require('./shoppingCart.js');
// addToCart('bread', 5);

// const { addToCart, totalPrice } = require('./shoppingCart.js');
// addToCart('bread', 5);
// console.log(totalPrice);

// const ShoppingCart = require('./shoppingCart.js');
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

////////////////////////////////////////////////// ES6 Modules vs CommonJS
// ES6 Modules are statically analyzed, which means that the imports and exports are determined at compile time. This allows for better optimization and tree shaking.
// CommonJS modules are dynamically loaded, which means that the imports and exports are determined at runtime. This can lead to issues with circular dependencies and can make it harder to optimize the code.

//////////////////////////////////////////////////
console.log('=========Introduction to NPM================');

import cloneDeep from 'lodash-es';
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 2 },
  ],
  user: { loggedIn: true },
};

const shallowClone = Object.assign({}, state);
const stateClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(shallowClone);

console.log(stateClone);
console.log(state);

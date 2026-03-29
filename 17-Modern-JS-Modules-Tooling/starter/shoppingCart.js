// export modules

console.log('Exporting Module in shoopingCart.js');

// Top-Level Await
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

// Named Exports
export const cart = [];
const shippingCost = 10;
const totalPrice = 237;
const quantity = 23;
export { shippingCost, totalPrice, quantity as tq };

// export function
export function addToCart(product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`,
  );
}

// Default Export
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`,
  );
}

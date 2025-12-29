'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'standard',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'premium',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////////////////////////////////////
// Functions

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html); // insertAdjacentHTML method inserts HTML into the DOM
  });
};
// displayMovements(account1.movements);

//Calculate  Total income, outocme & interest
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(amt => amt * (acc.interestRate / 100))
    .filter(val => val > 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} €`;
};
// calcDisplaySummary(account1);

// Calc total balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
// calcDisplayBalance(account1);

// Calc postive and negative summary

/// Need to create new property in account array name it as usernames and it should contain every first letter of the word in names in lowercase
const createUsernames = function (owner) {
  owner.forEach(function (acc) {
    acc.userName = acc.owner
      .split(' ')
      .map(name => name[0].toLowerCase())
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);

  //Display Summary
  calcDisplaySummary(acc);

  //Display Balance
  calcDisplayBalance(acc);
};
let currentacccount;
//Form Validation and Login
btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();
  currentacccount = accounts.find(
    val => val.userName === inputLoginUsername.value
  );
  if (currentacccount && currentacccount?.pin === Number(inputLoginPin.value)) {
    //Display UI Message
    labelWelcome.textContent = `Welcome back, ${
      currentacccount.owner.split(' ')[0]
    } !!!`;
    containerApp.style.opacity = 1;
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Update UI
    updateUI(currentacccount);
  }
});

//Transfer Functinality
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  //Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentacccount.balance &&
    receiverAcc?.userName !== currentacccount.userName
  ) {
    //Doing the transfer
    currentacccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentacccount);
  }
});

//Closure Account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentacccount.userName &&
    Number(inputClosePin.value) === currentacccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentacccount.userName
    );
    //Delete account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
  //Clear input fields
  inputCloseUsername.value = inputClosePin.value = '';
});

//Sort Functionality
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(
    !sorted
      ? currentacccount.movements.slice().sort((a, b) => a - b)
      : currentacccount.movements
  );
  sorted = !sorted;
});

// Loan Functionality
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentacccount.movements.some(mov => mov >= amount * 0.1)
  ) {
    //Add movement
    currentacccount.movements.push(amount);
    //Update UI
    updateUI(currentacccount);
  }
  //Clear input field
  inputLoanAmount.value = '';
});

/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([

//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Arrays Methods Practice

// 1. Slice Method
console.log('=============================');
console.log('----SLICE METHOD----');
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); //arr.slice(startIndex, length)
console.log(arr);
//Alternate option for slice is spread operator
//arr.slice() creates a shallow copy of the array
//So does [...arr]
//Difference is that slice() method creates a new array object. Also we can use slice() for chaining methods
//while spread operator just spreads the elements into a new array object

// 2. Splice Method
console.log('=============================');
console.log('----SPLICE METHOD----');
let arr2 = ['a', 'b', 'c', 'd', 'e'];
console.log(arr2);
console.log(arr2.splice(2)); //mutates the original array
console.log(arr2);
//console.log(arr2.splice(1, 2)); //arr.splice(startIndex, number of elements to be removed)
//console.log(arr2);

// 3. Reverse Method
console.log('=============================');
console.log('----REVERSE METHOD----');
let arr3 = ['a', 'b', 'c', 'd', 'e'];
console.log(arr3);
arr3.reverse(); //mutates the original array
console.log(arr3);

// 4. Concat Method
console.log('=============================');
console.log('----CONCAT METHOD----');
let arr4 = ['a', 'b', 'c', 'd', 'e'];
let arr5 = ['f', 'g', 'h', 'i', 'j'];
const letters = arr4.concat(arr5);
console.log(letters);
//Alternate option for concat is spread operator. Difference is that concat() method creates a new array object. Also we can use concat() for chaining methods
const letters2 = [...arr4, ...arr5];
console.log(letters2);

// 5. Join Method
console.log('=============================');
console.log('----JOIN METHOD----');
let arr6 = ['a', 'b', 'c', 'd', 'e'];
console.log(arr6);
console.log(arr6.join('-')); //joins the elements of the array into a string with the specified separator

// 6. At Method
console.log('=============================');
console.log('----AT METHOD----');
let arr7 = [23, 11, 64];
console.log(arr7);
console.log(arr7[0]); // disadvantage compare to at method is that we cannot use negative index to get elements from the end of the array
console.log(arr7.at(0));
//getting the last element of an array
console.log(arr7[arr7.length - 1]); //traditional way
console.log(arr7.slice(-1)[0]); //using slice() method
console.log(arr7.at(-1)); //using at() method. But at method will return last element in string format

//at() method also works on strings
console.log('jonas'.at(0));
console.log('jonas'.at(-1));

// 7. forEach Method
console.log('=============================');
console.log('----FOR EACH METHOD----');
const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for of loop
console.log('----FOR OF LOOP----');
for (const [i, movement] of movements2.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    //negative movement
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

//forEach loop
console.log('----FOR EACH LOOP----');
movements2.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    //negative movement
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

//Note: In forEach loop, we cannot use break or continue statements to control the loop. We can only use return statement to exit from the current iteration and move to the next iteration.

// 8. forEach Method with Maps and Sets
console.log('=============================');
console.log('----FOR EACH METHOD WITH MAPS AND SETS----');

//Map
const currencies2 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies2.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach(function (value, _, set) {
  //_ means we don't use this parameter. name is throwaway variable
  console.log(`${value}: ${value}`);
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
console.log('=============================');
console.log('----CHALLENGE #1----');
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1, 3);
  console.log(dogsJuliaCorrected);
  console.log(dogsJulia.slice(1, -2));
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

///////////////////////////////////////
// The map Method
console.log('=============================');
console.log('----MAP METHOD----');
const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

//Alternate Method
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

///////////////////////////////////////
// 9. The filter Method
console.log('=============================');
console.log('----FILTER METHOD----');
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

//Alternate Method - Not used for chain methods and large applications
const withdrawalsFor = [];
for (const mov of movements) if (mov < 0) withdrawalsFor.push(mov);
console.log(withdrawalsFor);

// const positive = movements.filter(mov => mov > 0); // Filter doesn't need to return individual values. With the help of boolean values we can filter the values

// console.log(positive);

///////////////////////////////////////
// 10. The reduce Method
console.log('=============================');
console.log('----REDUCE METHOD----');

//Example 1 - Sum of all the values
const total = movements.reduce((acc, cur) => acc + cur, 0); //0 is the initial value of accumulator
console.log(total);

//Example 2 - Find Max. value in array
const maxvalue = movements.reduce(
  (acc, cur) =>
    //First iteration, acc=cur[0], cur=cur[1]
    acc > cur ? acc : cur,
  movements[0]
);
console.log(maxvalue);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
console.log('=============================');
console.log('----CODING CHALLENGE #2----');
const calcAverageHumanAge = arr => {
  const humanAge = arr.map(function (currentValue, i, arr) {
    if (currentValue <= 2) {
      return 2 * currentValue;
    } else {
      return 16 + currentValue * 4;
    }
  });
  console.log(humanAge);

  const adultHumanAge = humanAge.filter(function (currentValue, i, arr) {
    return currentValue >= 18;
  });
  console.log(adultHumanAge);

  const averageAdultHumanAge =
    adultHumanAge.reduce(function (acc, cur, i, arr) {
      return acc + cur;
    }, 0) / adultHumanAge.length;
  console.log(averageAdultHumanAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

///////////////////////////////////////
// 11. Array of Chain Methods
console.log('=============================');
console.log('----ARRAY OF CHAIN METHODS----');

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, cur) => acc + cur, 0);
console.log(totalDepositsUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

console.log('=============================');
console.log('----CODING CHALLENGE #3----');
const calcAverageHumanAge2 = arr => {
  const averageAdultHumanAge2 = arr
    .map(currentValue =>
      currentValue <= 2 ? 2 * currentValue : 16 + currentValue * 4
    )
    .filter(currentValue => currentValue >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  console.log(averageAdultHumanAge2);
};
calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);

/////////////////////////////////////////////
// 12. Find Method
console.log('=============================');
console.log('----FIND METHOD----');

const firstWithdrawal = movements.find(mov => mov < 0); //returns the first element that satisfies the condition
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis'); //finding object in array of objects
console.log(account);

/////////////////////////////////////////////
// 13. FindLast Method

console.log('=============================');
console.log('----FIND LAST & FIND LAST INDEX METHOD----');

const lastWithdrawal = movements.findLast(mov => mov < 0); //returns the last element that satisfies the condition
console.log(movements);
console.log(lastWithdrawal);

const lastWithdrawalIndex = movements.findLastIndex(mov => mov < 0); //returns the last index of the element that satisfies the condition
console.log(lastWithdrawalIndex);

const lastLargetransactions = movements.findLastIndex(mov => mov > 2000); //returns the last index of the element that satisfies the condition
console.log(
  `the last large transaction is ${
    movements.length - 1 - lastLargetransactions
  } movements ago`
);

/////////////////////////////////////////////
// 14. Some and Every Methods
console.log('=============================');
console.log('----SOME AND EVERY METHOD----');

console.log(movements);

const depositIncludes = movements.includes(1300); //returns true if the element is found in the array
console.log(depositIncludes);

const anyDeposits = movements.some(mov => mov > 1500); //returns true if any element satisfies the condition
console.log(anyDeposits);

const deposit = mov => mov > 0;
const withDrawal = mov => mov < 0;

const allDeposits = movements.every(deposit); //returns true if all elements satisfy the condition
console.log(allDeposits);

const account1Deposits = account4.movements.every(deposit);
console.log(account1Deposits);

///////////////////////////////////////////////
// 15. Flat and FlatMap Methods
console.log('=============================');
console.log('----FLAT AND FLATMAP METHOD----');

const arrDeep = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrDeep.flat()); //flattens the array by one level

const arrDeep2 = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep2.flat(2)); //flattens the array by two levels

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//FlatMap Method
const overalBalance2 = accounts
  .flatMap(acc => acc.movements) //flatMap() method first maps each element using a mapping function, then flattens the result into a new array. It is identical to a map followed by flat of depth 1.
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

///////////////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

console.log('=============================');
console.log('----CODING CHALLENGE #4----');

//1.
const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
console.log(huskyWeight);

//2.

const dogBothActivities = breeds.find(
  dog => dog.activities.includes('running') && dog.activities.includes('fetch')
).breed;
console.log(dogBothActivities);

//3.
const allActivities = breeds.flatMap(dog => dog.activities);
console.log(allActivities);

//4.
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

//5.
const swimmingAdjacent = breeds
  .filter(dog => dog.activities.includes('swimming'))
  .flatMap(dog => dog.activities)
  .filter(activity => activity !== 'swimming');
const uniqueSwimmingAdjacent = [...new Set(swimmingAdjacent)];
console.log(uniqueSwimmingAdjacent);

//6.
const allAbove10kg = breeds.every(dog => dog.averageWeight >= 10);
console.log(allAbove10kg);

//7.
const anyActiveBreed = breeds.some(dog => dog.activities.length >= 3);
console.log(anyActiveBreed);

//BONUS
const heaviestFetchBreedWeight = Math.max(
  ...breeds
    .filter(dog => dog.activities.includes('fetch'))
    .map(dog => dog.averageWeight)
);
console.log(heaviestFetchBreedWeight);

//////////////////////////////////////////////
// 16.Sorting Arrays
console.log('=============================');
console.log('----SORTING ARRAYS----');

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); //mutates the original array
console.log(owners);

//Numbers
console.log(movements);
console.log(movements.sort()); //mutates the original array
// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

//Ascending order
movements.sort((a, b) => a - b); //Explain functionality of this line: If result is negative, a is before b. If result is positive, b is before a.
console.log(movements);

//Descending order
movements.sort((a, b) => b - a);
console.log(movements);

//////////////////////////////////////////////
// 17.Group BY Array Elements
console.log('=============================');
console.log('----GROUP BY ARRAY ELEMENTS----');

const transactionsGroup = Object.groupBy(movements, mov =>
  mov > 0 ? 'deposit' : 'withdrawal'
);
console.log(transactionsGroup);

const transactionStatus = Object.groupBy(accounts, acc => {
  if (acc.movements.length > 5) return 'very active';
  else if (acc.movements.length <= 3) return 'active';
  else return 'inactive';
});
console.log(transactionStatus);

const accountType = Object.groupBy(accounts, acc => acc.type);
console.log(accountType);

//////////////////////////////////////////////
//18. Ways to Create Arrays
console.log('=============================');
console.log('----WAYS TO CREATE ARRAYS----');

//1. Array Constructor
const x = new Array(7);
console.log(x);
console.log(x.map(() => 5)); //doesn't work because the array is empty

//2. Fill Method
x.fill(1, 3, 5); //fills the array with 1 from index 3 to index 5 (not inclusive)
console.log(x);

x.fill(1); //fills the entire array with 1
console.log(x);

x.fill(1, 4); //fills the array with 1 from index 4 to the end
console.log(x);

//3. Array.from Method
const y = Array.from({ length: 7 }, () => 1); //creates an array of length 7 filled with 1
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); //creates an array of length 7 with values from 1 to 7
console.log(z);

//Example: Generate 100 random dice rolls
const diceRolls = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);
console.log(diceRolls);

//Example: Convert string to array
const message = 'Hello World';
const messageArray = Array.from(message);
console.log(messageArray);

//Example: Get movements from UI
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')) //[200,450,-400,.....]
  );
  console.log(movementsUI);
});

////////////////////////////////////////////////
// 19. Non Destructive Methods vs Destructive Methods
console.log('=============================');
console.log('----NON DESTRUCTIVE VS DESTRUCTIVE METHODS----');

//Destructive Methods: These methods mutate the original array
//Examples: pop(), push(), shift(), unshift(), splice(), reverse(), sort(), fill()

//Non Destructive Methods: These methods do not mutate the original array and return a new array
//Examples: slice(), concat(), map(), filter(), reduce(), flat(), flatMap(), join(), at(), find(), findIndex(), some(), every(), includes()

//Summary of Destructive Methods added in ES2023:
// 1. toReversed(): Reverses the array without mutating the original array
// 2. toSorted(): Sorts the array without mutating the original array
// 3. toSpliced(): Splices the array without mutating the original array
// 4. with(): Changes the value at a specific index without mutating the original array

const arrDestructive = [1, 3, 2, 6, 5, 4];
console.log(arrDestructive);

//Using toReversed() method (Destructive)
const arrReverse = arrDestructive.toReversed();
console.log(arrReverse);
console.log(arrDestructive);

//using toSorted() method (Destructive)
const arrSorted = arrDestructive.toSorted();
console.log(arrSorted);
console.log(arrDestructive);

//Using toSpliced() method (Destructive)
const arrSpliced = arrDestructive.toSpliced(2, 2);
console.log(arrSpliced);
console.log(arrDestructive);

//Using with() method (Destructive)
const arrWith = arrDestructive.with(2, 10); //changes the value at index 2 to 10
console.log(arrWith);
console.log(arrDestructive);

/////////////////////////////////////////////
// 20. Summary of Some Important Array Methods
console.log('=============================');
console.log('----ARRAY METHODS PRACTICE----');

//1. Find sum of all deposits in the bank
const bankDepositsSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositsSum);

//2. Count number of deposits in the bank with at least 1000€
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(deposit => deposit > 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
console.log(numDeposits1000);

//3. Create an object which contains sum of deposits and sum of withdrawals
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    ({ deposits, withdrawals }, cur) => {
      if (cur > 0) deposits += cur;
      else withdrawals += cur;
      return { deposits, withdrawals };
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

//4. Convert a string to title case
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = [
    'a',
    'an',
    'and',
    'the',
    'but',
    'or',
    'on',
    'in',
    'with',
    'is',
    'to',
    'for',
    'of',
  ];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////////
// CODING CHALLENGFE 5
/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/
console.log('=============================');
console.log('----CODING CHALLENGE #5----');
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1.
dogs.forEach(dog => {
  dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

//2.
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahsDog);
console.log(
  `Sarah's dog is eating too ${
    sarahsDog.curFood > sarahsDog.recFood ? 'much' : 'little'
  }`
);

//3.
const ownersTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersTooMuch);

const ownersTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersTooLittle);

//4.
console.log(`${ownersTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersTooLittle.join(' and ')}'s dogs eat too little!`);

//5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//6.
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.every(checkEatingOkay));

//7.
const dogsEatingOkay = dogs.filter(checkEatingOkay);
console.log(dogsEatingOkay);

//8.
const dogsGroup = Object.groupBy(dogs, dog => {
  if (dog.curFood === dog.recFood) return 'exact';
  else if (dog.curFood > dog.recFood) return 'too-much';
  else return 'too-little';
});
console.log(dogsGroup);

//9.
const dogsByOwners = Object.groupBy(dogs, dog => dog.owners.length);
console.log(dogsByOwners);

//10.
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood); //slice() method is used to create a shallow copy of the array so that the original array is not mutated
console.log(dogsSorted);

/////////////////////////////////////////////
// END OF PROJECT
console.log('=============================');
console.log('----END OF PROJECT----');

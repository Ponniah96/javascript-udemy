console.log("Coding Challenge");
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

let dolphinAverage = calcAverage(85, 54, 41);
let koalaAverage = calcAverage(23, 34, 27);
console.log(`Dolphin Average: ${dolphinAverage}, Koala Average: ${koalaAverage}`);

const checkWinner = function (avgDolphin, avgKoala) {
  if (avgDolphin >= 2 * avgKoala) {
    console.log(`Dolphins win (${avgDolphin} vs. ${avgKoala})`);
  } else if (avgKoala >= 2 * avgDolphin) {
    console.log(`Koalas win (${avgKoala} vs. ${avgDolphin})`);
  } else {
    console.log("No team wins...");
  }
};

checkWinner(dolphinAverage, koalaAverage);

dolphinAverage = calcAverage(44, 23, 71);
koalaAverage = calcAverage(65, 54, 49);
console.log(`Dolphin Average: ${dolphinAverage}, Koala Average: ${koalaAverage}`);
checkWinner(dolphinAverage, koalaAverage);  


// Array Cdeing Challenge - Not included in the original challenge but added for completeness
const calcTip = bill => (bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2);

const bills = [125, 555, 44];
const tips = bills.map(bill => calcTip(bill));
const total = bills.map((bill, index) => bill + tips[index]);

console.log(`Bills: ${bills}`);
console.log(`Tips: ${tips}`);
console.log(`Total: ${total}`);
console.log(`Bill: ${bills[0]}, Tip: ${tips[0]}, Total: ${total[0]}`);

//Object Coding Challenge - Not included in the original challenge but added for completeness
const john = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
    return this.bmi;
  }
};

const mark = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
    return this.bmi;
  }
};

john.calcBMI();
mark.calcBMI();

if (john.bmi > mark.bmi) {
  console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`);
} else if (mark.bmi > john.bmi) {
  console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`);
} else {
  console.log(`${john.fullName} and ${mark.fullName} have the same BMI (${john.bmi})`);
}

// Array For loop Coding Challenge - Not included in the original challenge but added for completeness
const bills2 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips2 = [];
const totals2 = [];

for (let i = 0; i < bills2.length; i++) {
  const tip = calcTip(bills2[i]);
  tips2.push(tip);
  totals2.push(bills2[i] + tip);
} 

// Calculate average of totals2
const calcAverage2 = function(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

console.log(calcAverage2(totals2));
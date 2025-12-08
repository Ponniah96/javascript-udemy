console.log("-----");
console.log("-----");
console.log("Coding Challenge");

const markWeight = 78; // in kg
const markHeight = 1.69; // in meters

const johnWeight = 92; // in kg
const johnHeight = 1.95; // in meters

const isMarkHigherBMI = (markWeight/(markHeight * markHeight)) > (johnWeight/(johnHeight * johnHeight));

console.log(`Is Mark's BMI (${markWeight/(markHeight * markHeight)}) higher than John's (${johnWeight/(johnHeight * johnHeight)})? ${isMarkHigherBMI}`);

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

if (BMIMark > BMIJohn) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})`);
} else {
  console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})`);
}


const dolphinScore1 = 44;
const dolphinScore2 = 23;
const dolphinScore3 = 71;

const koalaScore1 = 65;
const koalaScore2 = 54;
const koalaScore3 = 49;

const dolphinAverage = (dolphinScore1 + dolphinScore2 + dolphinScore3) / 3;
const koalaAverage = (koalaScore1 + koalaScore2 + koalaScore3) / 3;
console.log(`Dolphin Average Score: ${dolphinAverage}`);
console.log(`Koala Average Score: ${koalaAverage}`);
if (dolphinAverage > koalaAverage && dolphinAverage >= 100) {
    console.log(`Dolphins win the trophy with an average score of ${dolphinAverage}`);
} else if (koalaAverage > dolphinAverage && koalaAverage >= 100) {
    console.log(`Koalas win the trophy with an average score of ${koalaAverage}`);
} else if (dolphinAverage === koalaAverage && dolphinAverage >= 100 && koalaAverage >= 100) {
    console.log(`It's a draw with both teams having an average score of ${dolphinAverage}`);
} else {
    console.log("No team wins the trophy as minimum average score of 100 is not met by either team.");
}


const bill = 275;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
const total = bill + tip;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${total}`);  
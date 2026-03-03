'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderHTML = function (
  data,
  className = '',
  countrycontainer = countriesContainer,
) {
  const html = `
       <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(
              data.languages,
            ).join(', ')}</p>
            <p class="country__row"><span>💰</span>${Object.values(
              data.currencies,
            )
              .map(cur => cur.name)
              .join(', ')}</p>
          </div>
        </article>
      `;
  countrycontainer.insertAdjacentHTML('beforeend', html);
  countrycontainer.style.opacity = 1;
};

const renderError = function (msg, countrycontainer = countriesContainer) {
  countrycontainer.insertAdjacentText('beforeend', msg);
  countrycontainer.style.opacity = 1;
};

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
//Fetch and render country datausign xmlhttprequest
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    const countriesContainer1 = document.querySelector('.countries--1');
    renderHTML(data, '', countriesContainer1);
  });
};
getCountryData('india');

///////////////////////////////////////////////
// Get country and its neighbour data using callback hell

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    const countriesContainer1 = document.querySelector('.countries--2');
    renderHTML(data, '', countriesContainer1);

    const neighbour = data.borders?.[0]; // Get the first neighbour
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      const countriesContainer2 = document.querySelector('.countries--2');
      renderHTML(data2, 'neighbour', countriesContainer2);
    });
  });
};
getCountryAndNeighbour('india');

///////////////////////////////////////////////
// Get country  using fetch and promises

const getCountryUsingFetch = function (country) {
  // Country 1
  // Old version using promises
  // fetch(`https://restcountries.com/v3.1/name/${country}`)
  //   .then(function (response) {
  //     console.log(response); // Log the response object
  //     // console.log(response.json());
  //     return response.json(); // Convert the response to JSON, because the fetch API returns a response object, and we need to parse it to get the actual data
  //   })
  //   .then(function (data) {
  //     console.log(data); // Log the parsed data
  //     renderHTML(data[0]); // Render the first country from the data array
  //   });

  // Trim version using arrow functions
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data =>
      renderHTML(data[0], '', document.querySelector('.countries--3')),
    );
};
getCountryUsingFetch('india');

///////////////////////////////////////////////
// Get country and neighbour using fetch and chain of promises

const getCountryAndNeighbourUsingFetch = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderHTML(data[0], '', document.querySelector('.countries--4'));

      const neighbour = data[0].borders?.[0]; // Get the first neighbour
      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data =>
      renderHTML(data[0], 'neighbour', document.querySelector('.countries--4')),
    );
};
getCountryAndNeighbourUsingFetch('india');

///////////////////////////////////////////////
// Promise Error Handling

const fetchReponse = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryDataWithErrorHandling = function (country) {
  fetchReponse(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found',
  )
    .then(data => {
      renderHTML(data[0], '', document.querySelector('.countries--5'));

      // const neighbour = data[0].borders?.[0]; // Get the first neighbour

      // if (!neighbour) return; // guard clause to check if neighbour exists, if not return early and skip the rest of the code in the .then() block

      const neighbour = 'sgdhs'; // Get the first neighbour
      if (!neighbour) {
        throw new Error('No neighbour found!'); // Throw a new error if no neighbour is found, which will be caught in the .catch() block below
      }

      // Country 2
      return fetchReponse(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Neighbour country not found',
      );
    })
    .then(data =>
      renderHTML(data[0], 'neighbour', document.querySelector('.countries--5')),
    )
    .catch(err =>
      renderError(`${err} 💥💥💥`, document.querySelector('.countries--5')),
    ) // Catches Error if anything occurs
    .finally(() => (document.querySelector('.countries--5').style.opacity = 1)); // Finally will execute regardless of the outcome of the promise, whether it is fulfilled or rejected. In this case, it will set the opacity of the countries container to 1, ensuring that it becomes visible even if an error occurs during the fetch operation.
};

btn.addEventListener('click', function () {
  getCountryDataWithErrorHandling('india');
});

///////////////////////////////////////////////
// Coding Challenge #1

// In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. For that, you will use a second API to geocode the provided coordinates. So in this challenge, you will use an API on your own for the first time
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples: 52.508, 13.381 / 19.037, 72.873 / -33.933, 18.474)
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}
// 3. Once you have the data, take the relevant parts and render a country using the first API you learned about: https://restcountries.com/v3.1/name/{country}
// PART 2
// 4. Render the country and catch any errors. If an error occurs, log it to the console
// 5. Test the function with different coordinates (e.g., see above)
// 6. Figure out how to get the user's current position, and how to get coordinates from it. Use this data to render the country where the user is located. (If you can't get the geolocation API to work, just hardcode some coordinates)

// GOOD LUCK 😀

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`Problem with geocoding ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const country = data.countryName;
      return fetchReponse(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(data =>
      renderHTML(data[0], '', document.querySelector('.countries--6')),
    )
    .catch(err => console.error(`${err} 💥💥💥`));
};

whereAmI(19.037, 72.873);
// whereAmI(52.508, 13.381);
// whereAmI(-33.933, 18.474);

////////////////////////////////////////////
// Event Loop in Practice

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved Promise 1').then(res => console.log(res));
Promise.resolve('Resolved Promise 2').then(res => {
  for (let i = 0; i < 100000; i++) {} // Simulate a long-running task
  console.log(res);
});
console.log('Test end');

///////////////////////////////////////////////////////////
// Building a Simple Promise
console.log('Building Promise');

const lotteryPromise = new Promise(function (resolve, reject) {
  // The executor function is the function that is passed to the Promise constructor, and it is executed immediately when the promise is created. It takes two parameters: resolve and reject, which are functions that can be called to either fulfill the promise (resolve) or reject it (reject).
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

// Test
// console.log('Test promise');
// const testPromise = new Promise(function (resolve, reject) {
//   if (1 == 2) resolve('Promise Resolved');
//   else reject('Promise Rejected');
// });
// testPromise
//   .then(response => console.log(response))
//   .catch(error => console.error(error));

// Promisifying the Geolocation API
console.log('Promisfying Geoloacation API');
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const newButton = document.querySelector('.btn-country--1');
newButton.addEventListener('click', function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log(`You are at latitude ${lat} and longitude ${lng}`);
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
      );
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Problem with geocoding ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const country = data.countryName;
      console.log(`You are in ${country}`);
      return fetchReponse(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(data =>
      renderHTML(data[0], '', document.querySelector('.countries--7')),
    )
    .catch(err => console.error(`${err.message} 💥`));
});

////////////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. 
This function returns a promise which creates a new image (use document.createElement('img')) 
and sets the .src attribute to the provided image path. 
When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. 
The fulfilled value should be the image element itself.
In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image 
(HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.appendChild(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

///////////////////////////////////////////////////////////
// Handling Promises using Async/Await

const whereAmIAsync = async function () {
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  const resGeo = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
  );
  const dataGeo = await resGeo.json();
  const country = dataGeo.countryName;

  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();
  renderHTML(data[0], '', document.querySelector('.countries--8'));
};

whereAmIAsync();

// const testPromise = function (promiseValue) {
//   return new Promise(function (resolve, reject) {
//     if (promiseValue == 2) resolve('Promise Resolved');
//     else reject('Promise Rejected');
//   });
// };
// //test promise using aync/await
// const testPromiseAsync = async function () {
//   const testPromisereult = await testPromise(3);
//   console.log(testPromisereult);
// };
// testPromiseAsync();
//

//////////////////////////////////////////////////////////
// Error handling using try/catch in async/await
console.log('Error Handling using try catch block in async await');

const whereAmIAsyncErrorHandling = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    const country = dataGeo.countryName;

    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error('Problem getting country data');
    const data = await res.json();
    renderHTML(data[0], '', document.querySelector('.countries--9'));
  } catch (err) {
    console.error(`${err.message} 💥`);
    renderError(
      `💥 ${err.message} 💥`,
      document.querySelector('.countries--9'),
    );
  }
};
(async function () {
  try {
    const result = await whereAmIAsyncErrorHandling();
    console.log('result from IIFE:', result);
  } catch (err) {
    console.error(`Error in IIFE: ${err.message} 💥`);
  }
  console.log('Finished Country location');
})();

// Promise ALL
console.log('Promise ALL Method');

const get3Countries = async function (c1, c2, c3) {
  try {
    //Before Promise All
    // const [data1] = await fetch(`https://restcountries.com/v3.1/name/${c1}`).then(res => res.json());
    // const [data2] = await fetch(`https://restcountries.com/v3.1/name/${c2}`).then(res => res.json());
    // const [data3] = await fetch(`https://restcountries.com/v3.1/name/${c3}`).then(res => res.json());
    // console.log(data1.capital[0], data2.capital[0], data3.capital[0]);

    //Promise All is used to run multiple promises in parallel and wait for all of them to be fulfilled.
    // It takes an array of promises as input and returns a new promise that resolves to an array of the resolved values of the input promises, in the same order as the input promises.
    // If any of the input promises reject, the returned promise will reject with the reason of the first promise that rejects.
    const data = await Promise.all([
      fetchReponse(`https://restcountries.com/v3.1/name/${c1}`),
      fetchReponse(`https://restcountries.com/v3.1/name/${c2}`),
      fetchReponse(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  }
};
get3Countries('portugal', 'canada', 'tanzania');

// Promise.race
console.log('Promise Race');

(async function () {
  const res = await Promise.race([
    fetch(`https://restcountries.com/v3.1/name/italy`),
    fetch(`https://restcountries.com/v3.1/name/egypt`),
    fetch(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  const data = await res.json();
  console.log(data[0].capital[0]);
})();
// In this example, we are using Promise.race to fetch data for three different countries (Italy, Egypt, and Mexico). The Promise

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};
Promise.race([fetch(`https://restcountries.com/v3.1/name/italy`), timeout(0.1)])
  .then(res => res.json())
  .then(data => console.log(data[0].capital[0]))
  .catch(err => console.error(err));
// In this example, if the fetch request takes longer than 0.1 seconds, the timeout promise will reject and the catch block will handle the error, logging "Request took too long!" to the console. If the fetch request completes within 0.1 seconds, it will log the capital of Italy to the console.

// Promise.allSettled
console.log('Promise AllSettled');

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));
// Logs an array of objects with the status and value/reason of each promise, regardless of whether they were fulfilled or rejected.

// Promise.any
console.log('Promise Any');

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
// Logs "Success" to the console, as it is the first fulfilled promise. If all promises were rejected, it would log an AggregateError to the console.

///////////////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
1. Create an async function 'loadNPause' that recreates Challenge #2, this time using async/await (only the part where the promise is consumed, reuse the createImage function from before);
2. Compare the two versions, think about the big differences, and see which one you like more.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the createImage function (call the resulting array 'imgs')
3. Check out the imgs array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: Images in the img folder. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgElements = await Promise.all(imgs);
    console.log(imgElements);
    imgElements.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

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

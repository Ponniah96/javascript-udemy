'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//////////////////////////////////////////
// Initialise global variables
// let map, mapEvent;

// // Get Geolocation Coordinates
// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     const { latitude } = position.coords;
//     const { longitude } = position.coords;
//     console.log(`${latitude}, ${longitude}`);
//     console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//     // Display Map
//     map = L.map('map').setView([latitude, longitude], 16);

//     L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     L.marker([latitude, longitude])
//       .addTo(map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 100,
//           autoClose: false,
//           closeOnClick: false,
//         }).setContent('Current Location'),
//       )
//       .openPopup();

//     map.on('click', function (mapE) {
//       mapEvent = mapE;

//       form.classList.remove('hidden');
//       inputDistance.focus();

//       // const { lat, lng } = mapE.latlng;
//       // L.marker([lat, lng])
//       //   .addTo(map)
//       //   .bindPopup(
//       //     L.popup({
//       //       maxWidth: 250,
//       //       minWidth: 100,
//       //       autoClose: false,
//       //       closeOnClick: false,
//       //       className: 'running-popup',
//       //     }).setContent('Workout'),
//       //   )
//       //   .openPopup();
//     });
//   },
//   function () {
//     alert('Could not get your position');
//   },
// );

// // Form Submit Event Handler
// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   // Get data from form
//   const type = inputType.value;
//   const distance = +inputDistance.value;
//   const duration = +inputDuration.value;
//   const { lat, lng } = mapEvent.latlng;

//   // Clear input fields
//   inputDistance.value =
//     inputDuration.value =
//     inputCadence.value =
//     inputElevation.value =
//       '';

//   // Display marker on map
//   L.marker([lat, lng])
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: `${type}-popup`,
//       }).setContent(`${type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} Workout`),
//     )
//     .openPopup();
// });

// // Change form fields based on workout type
// inputType.addEventListener('change', function () {
//   // Toggle visibility of cadence and elevation fields based on workout type closest parent element
//   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
// });

///////////////////////////////////////////
// Refactor code using OOP

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  calcPace = function () {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  };
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed = function () {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  };
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycle1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1);
// console.log(cycle1);

class App {
  #map;
  #mapEvent;
  #workouts = [];
  #clicks = 0;

  constructor() {
    // Get Geolocation Coordinates
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    this.click = () => {
      this.#clicks += 1;
    };
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        },
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`${latitude}, ${longitude}`);
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    // Display Map
    this.#map = L.map('map').setView([latitude, longitude], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker([latitude, longitude])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
        }).setContent('Current Location'),
      )
      .openPopup();

    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;

    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
  }

  _newWorkout(e) {
    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    // Validate data
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Create workout object based on workout type
    let workout;
    if (type === 'running') {
      if (
        !validInputs(distance, duration, +inputCadence.value) ||
        !allPositive(distance, duration, +inputCadence.value)
      )
        return alert('Inputs have to be positive numbers!');
      const cadence = +inputCadence.value;
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      if (
        !validInputs(distance, duration, +inputElevation.value) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');
      const elevation = +inputElevation.value;
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new workout to workout array
    this.#workouts.push(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Hide form + Clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;

    if (workout.type === 'running') {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `;
    }

    if (workout.type === 'cycling') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      `;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        }).setContent(
          `${workout.type === 'running' ? '🏃‍♂️ ' : '🚴‍♀️ '}${workout.description}`,
        ),
      )
      .openPopup();
  }

  _toggleElevationField() {
    // Toggle visibility of cadence and elevation fields based on workout type closest parent element
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id,
    );
    this.#map.setView(workout.coords, 16, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // e.click();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();

// Summary or key points covered in this code:
// 1. The code defines a workout tracking application using JavaScript, leveraging the Leaflet library for map interactions.
// 2. It includes classes for Workout, Running, Cycling, and App to structure the application logic.
// 3. The App class manages the map, user interactions, and local storage for workouts.
// 4. Users can log running and cycling workouts by clicking on the map, filling out a form, and the workouts are displayed both on the map and in a list.
// 5. The application also allows users to view workout details and navigate to workout locations on the map by clicking on the workout entries in the list.
// 6. Local storage is used to persist workout data across sessions, and there is a reset method to clear the stored workouts.
// Note: The code includes comments and console logs for debugging purposes, which can be removed in a production environment.
// End of code

//

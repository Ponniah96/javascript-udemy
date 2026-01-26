'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////
// SELECTING DOM ELEMENTS
console.log('------Selecting DOM Elements-------');

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');

//CREATING AND INSERTING ELEMENTS
// .insertAdjacentHTML
console.log('------Creating and Inserting Elements-------');

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // to add as first child
header.append(message); // to add as last child
// header.append(message.cloneNode(true)); // to add multiple times

// header.before(message); // to add as sibling before header
// header.after(message); // to add as sibling after header

// DELETING ELEMENTS
console.log('-----Deleting Elements------');

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

////////////////////////////////////////
// STYLES
console.log('------Styles-------');

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // empty because style property only access inline styles
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message));

console.log(getComputedStyle(message).color); // to get all the styles applied to the element
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// CSS VARIABLES
// document.documentElement.style.setProperty('--color-primary', 'orangered'); // to change css variable

/////////////////////////////////////////
// ATTRIBUTES
console.log('------Attributes-------');

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

console.log(logo.getAttribute('designer')); // custom attribute
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // absolute path
console.log(logo.getAttribute('src')); // relative path

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // absolute path
console.log(link.getAttribute('href')); // relative path

// DATA ATTRIBUTES
console.log(logo.dataset.versionNumber);

/////////////////////////////////////////
// CLASSES
console.log('------Classes-------');

logo.classList.add('c', 'd', 'e', 'f');
logo.classList.remove('c', 'd');
// logo.classList.toggle('c');
console.log(logo.classList.contains('c')); // not includes

// Don't use
// logo.className = 'jonas'; --- IGNORE ---

/////////////////////////////////////////
// Scrolling
console.log('------Scrolling-------');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // to get size and position relative to viewport.

  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY); // current scroll position. X- horizontal, Y- vertical

  console.log(
    'Height/Width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth,
  ); // height and width of viewport. Excludes scrollbar

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Testing
// const featureheader = document.querySelector('.features__header');
// console.log(featureheader.getBoundingClientRect());

/////////////////////////////////////////
// Types of Events and Event Handlers
console.log('------Types of Events and Event Handlers-------');

const h1 = document.querySelector('h1');

h1.onmouseenter = function (e) {
  //--- IGNORE ---
  console.log('Mouse entered function1'); //--- IGNORE ---
};

h1.onmouseenter = function (e) {
  //--- IGNORE ---
  console.log('Mouse entered function2'); //--- IGNORE ---
};

const alertH1 = function (e) {
  console.log('Mouse entered 1');
  h1.removeEventListener('mouseenter', alertH1); //Remove after first time
};
const alertH2 = function (e) {
  console.log('Mouse entered 2');
  h1.removeEventListener('mouseenter', alertH2); //Remove after first time
};

h1.addEventListener('mouseenter', alertH1);
h1.addEventListener('mouseenter', alertH2);
// h1.removeEventListener('mouseenter', alertH1); --- IGNORE ---

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); --- IGNORE ---

/////////////////////////////////////////
// Event Capturing and Bubbling
console.log('------Event Capturing and Bubbling-------');

/////////////////////////////////////////
// Event Propagation in Practice
console.log('------Event Propagation in Practice-------');

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  //--- IGNORE ---
  this.style.backgroundColor = randomColor(); //--- IGNORE ---
  console.log('LINK', e.target, e.currentTarget); //e.currentTarget is the element to which the event handler is attached.
  console.log(e.currentTarget === this); //both are same
  // e.stopPropagation(); //Stop propogation is used to stop bubbling phase.
}); //--- IGNORE ---

document.querySelector('.nav__links').addEventListener('click', function (e) {
  //--- IGNORE ---
  this.style.backgroundColor = randomColor(); //--- IGNORE ---
  console.log('CONTAINER', e.target, e.currentTarget); //--- IGNORE ---
}); //--- IGNORE ---

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true, // capturing phase - This will call first because event is captured from top to down
);

///////////////////////////////////////////
// Event Delegation: Implementing Page Navigation
console.log('------Event Delegation: Implementing Page Navigation-------');

// Below code is replaced with event delegation code. Reason: performance issue when there are many elements.
// document.querySelectorAll('.nav__link').forEach(function (el) { --- IGNORE ---
//   el.addEventListener('click', function (e) { --- IGNORE ---
//     e.preventDefault(); --- IGNORE ---
//     const id = this.getAttribute('href'); --- IGNORE ---
//     console.log(id); --- IGNORE ---
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); --- IGNORE ---
//   }); --- IGNORE ---
// }); --- IGNORE ---

// Event delegation steps:
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    // to check if the clicked element has nav__link class
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////
// DOM TRAVERSING
console.log('------DOM TRAVERSING-------');

// Going downwards: child
console.log('Query Selector: ', h1.querySelectorAll('.highlight')); // to select all the child elements with nav__item class
console.log('h1.children', h1.children); // to select all the direct child elements
console.log('h1.childNodes', h1.childNodes); // to select all the child nodes including text and comment nodes
console.log('h1.firstChild', h1.firstChild); // first child node
console.log('h1.firstElementChild', h1.firstElementChild); // first child element
console.log('h1.lastChild', h1.lastChild); // last child node
console.log('h1.lastElementChild', h1.lastElementChild); // last child element
// h1.firstElementChild.style.backgroundColor = 'white';
// h1.lastElementChild.style.backgroundColor = 'orangered';

// Going upwards: parents
console.log('h1.parentNode', h1.parentNode); // direct parent node
console.log('h1.parentElement', h1.parentElement); // direct parent element. Same as parentNode for element nodes. main difference is parentNode can return non-element nodes also.

// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // closest ancestor with header class

// Going sideways: siblings
console.log('h1.previousElementSibling', h1.previousElementSibling);
console.log('h1.nextElementSibling', h1.nextElementSibling);

console.log(
  'h1.parentElement.children',
  h1.parentElement.children,
  typeof h1.parentElement.children,
); // to get all the sibling elements

console.log(...h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  console.log(el);

  // if (el !== h1) el.style.transform = 'scale(0.5)';
});

/////////////////////////////////////////
// Building a Tabbed Component
console.log('------Building a Tabbed Component-------');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => --- IGNORE ---
//   t.addEventListener('click', function (e) { --- IGNORE ---
//     console.log('TAB'); --- IGNORE ---
//   }) --- IGNORE ---
// ); --- IGNORE ---

// Event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // to get the closest parent with operations__tab class

  // Guard clause. Guard clause is used to exit the function if certain condition is not met. Advantage: avoids nested if statements.
  if (!clicked) return;

  console.log(tabs, typeof tabs);
  console.log(
    document.getElementsByClassName('operations__tab'),
    typeof document.getElementsByClassName('operations__tab'),
  );

  // Remove active classes for tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // [...document.getElementsByClassName('operations__tab')].forEach(t =>
  //   console.log(t),
  // ); // to get all the elements with operations__tab--active class

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Remove active classes for content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/////////////////////////////////////////
// Passing Arguments to Event Handlers
console.log('------Passing Arguments to Event Handlers-------');

const nav = document.querySelector('.nav');
const handleHover = function (e) {
  console.log(this, e.target); // 'this' keyword will have the value passed from bind method
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // 'this' is used to get the argument passed to the event handler
    });
    logo.style.opacity = this;
  }
};
// Calling directly
// nav.addEventListener('mouseover', handleHover(e, 0.5)); // it throws error because handleHover(e, 0.5) is called immediately and the return value (undefined) is passed as event handler

// Traditional way of passing argument
// nav.addEventListener('mouseover', function (e) { --- IGNORE ---
//   handleHover(e, 0.5); --- IGNORE ---
// }); --- IGNORE ---

// Passing "argument" into handler using bind function
nav.addEventListener('mouseover', handleHover.bind(0.5)); // bind creates a new function where 'this' keyword is set to the value passed as argument
nav.addEventListener('mouseout', handleHover.bind(1)); // mouseout is opposite of mouseover

//////////////////////////////////////////
// Sticky Navigation
console.log('------Sticky Navigation-------');

// Traditional way of sticky navigation
// const initialCoords = section1.getBoundingClientRect().top;
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Instead of scroll event, we can use Intersection Observer API for better performance. because scroll event can fire multiple times in a second which can cause performance issues.

// Intersection Observer API Basics Example
console.log('------Intersection Observer API Basics-------');

const obsCallback = function (entries) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null, // null means viewport
  threshold: [0, 0.2], // percentage of intersection at which the callback is called
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); // to observe the section1 element

// Sticky navigation: Intersection Observer API
const header1 = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; // entries is an array of threshold entries

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // margin around the root. negative value means margin inside the root
});
headerObserver.observe(header1);

/////////////////////////////////////////
// Reveal Sections on Scroll
console.log('------Reveal Sections on Scroll-------');

const allSections1 = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  // const [entry] = entries; // It throws error when we reload the page quickly because the callback is called with empty entries array.

  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target); // to stop observing the section once it is revealed
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections1.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////////
// Lazy Loading Images
console.log('------Lazy Loading Images-------');
console.log(
  'Loading image is basically replace low quality images with high resolution images when user reach that particular image section',
);

const imgTargets = document.querySelectorAll('img[data-src]'); // select all images with data-src attribute

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    // Reason that we need load event is that the image might take some time to load and we want to remove the blur effect only after the image is fully loaded.
    entry.target.classList.remove('lazy-img'); // to remove blur effect after image is loaded
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // to load image 200px before it comes into view
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////////////////
// Slider Component
console.log('------Slider Component-------');
// Slider implemenrtation for sample images

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length - 1;

// Slider Functions
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`), // Move slides to left or right based on current slide
  );
};

// Next slide
const nextSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide); // Move slides to left position: 0%, -100%, -200%, -300%
  activateDot(currentSlide);
};

// Previous slide
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide); // Move slides to right position: -100%, 0%, 100%, 200%
  activateDot(currentSlide);
};

// Dots
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`,
    );
  });
};

const activateDot = function (slide) {
  // Remove active class from all dots
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  // Add active class to current dot
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const init = function () {
  goToSlide(0); // Initial slide position: 0%, 100%, 200%, 300%
  createDots();
  activateDot(0);
};
init();

// Event handlers
btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const curSlide = Number(e.target.dataset.slide);
    goToSlide(curSlide);
    activateDot(curSlide);
  }
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

/////////////////////////////////////////
// Lifecycle DOM Events
console.log('------Lifecycle DOM Events-------');

// DOMContentLoaded event is fired when the HTML is completely parsed and DOM tree is built. It does not wait for stylesheets, images, and subframes to finish loading.
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// beforeunload event is fired when the window, the document and its resources are about to be unloaded. This event enables you to display a confirmation dialog to the user, asking them if they really want to leave the page.
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

import icons from 'url:../img/icons.svg'; // Parcel 2
import 'core-js/stable'; // polyfill everything else
import 'regenerator-runtime/runtime'; // polyfill async/await

import * as model from './modal.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

/*
Steps to implement this app

1. Fetch a recipe from the API
2. Render the recipe in the UI
3. User select recipe from the side menu, it should open the recipe in the UI. Use haschange, load event and guard clauses to implement this feature
4. Refactor the code, split it into MVC (Model-View-Controller) architecture. Wrap API calls into the model, create views to render the UI and controller to handle the logic
5. Use NPM Fraction package to render the ingredients in a nice format
6. refactor code into further by creating config and helper files to handle api URL, timeout and other constants. Create helper functions to handle common tasks like AJAX calls, formatting numbers, etc.
7. Handleevents using publisher-subscriber pattern. Create a method in the view to add event handlers and call the controller function as a callback. This way we can keep the view and controller separate and maintainable.
8. Handle error and message rendering in the UI. Create methods in the view to render error and success messages and call them from the controller when needed.
9. Implement Search functionality
9.1. Create API call to search for recipes based on a query
9.2. Create a search view to handle the search input and results rendering
9.3. Create a controller function to handle the search logic and connect it to the search view
9.4. Call constructor function in the init function to set up the event handlers for search functionality (for form submit and search button click)
9.5. Create View.js to handle common functions like rendering spinner, error messages, etc. and use it in both recipeView and searchView to avoid code duplication
9.6. Handle error functions in View.js if data is either undefined or length is 0. Call this function in the controller when rendering search results and recipe details to handle cases where no results are found or recipe details are not available.
9.7. Create generate markup function in searchView class to handle the rendering of search results in the UI. Use this function in the controller to render the search results when a search is performed.
10. Implement Pagination Functioanlity for search results
10.1. In Search results, render first 10 results using slice method.
10.2. Create common variable in config.js to handle pagination count (number of results per page)
10.3. Create 2 variables in the state to handle current page and total pages based on search results
10.4. Create new View for pagination buttons and render the buttons based on the current page and total pages. 
10.5. Find number of pages based on total search results and results per page.
10.6. If current page is 1 and there are more pages, render only next button. 
10.7. If current page is last page, render only previous button. 
10.8. If current page is in between, render both buttons.
10.9. If current page is 1 and there are no more pages, render no buttons.
10.10. Add event handlers to the pagination buttons to handle page changes and render the new search results based on the new page number.
10.11. Create a new controller function to handle the pagination logic and connect it to the pagination view.
11. Implement update recipe servings functionality
11.1. Create a new method in the model to update the recipe servings based on user input and adjust the ingredient quantities accordingly.
11.2. Formula to update ingredient quantities: newQuantity = oldQuantity * (newServings / oldServings)
11.3. Create a new view to handle the rendering of the updated recipe details when the servings are changed.
11.4. Create a new controller function to handle the logic for updating the recipe servings and connect it to the view.
11.5. Add event handlers to the buttons for increasing and decreasing servings in the recipe view to call the controller function when clicked.
11.6. Using Event Delegation, closest method and dataset to handle the click events on the servings buttons and pass the new servings value to the controller function to update the recipe details in the UI.
12. Update DOM elements efficiently by only updating the changed elements instead of re-rendering the entire view.
12.1. Create a new method in the view to update only the changed elements in the DOM based on the new data.
12.2. Create update method in the view to compare the new data with the current data and update only the changed elements in the DOM.
12.3. use DOM.createRange().createContextualFragment() to create a virtual DOM and compare it with the current DOM to find the changed elements and update only those elements in the UI.
12.4. Update changed DOM text content based on the new data without re-rendering the entire view. 
12.5. Using array.isEqualNode and nodeValue to compare the text content of the new virtual DOM with the current DOM and update only the changed text content in the UI.
12.6. Update changed DOM attributes based on the new data without re-rendering the entire view. 
13. Implement bookmark functioanlity to allow users to bookmark their favorite recipes and view them in a separate bookmarks view.
13.1. Create new event listener for bookmark button in the recipe view and connect it to a new controller function to handle the bookmarking logic.
13.2. Create new method in controller to add or remove recipes from the bookmarks based on user input and update the bookmarks view accordingly.
13.3. Create new method in the model to handle the state of the bookmarks int recipr array and create new bookmark array to store the bookmarked recipes.
13.4. Update recipe view to show the bookmark button as active when a recipe is bookmarked and inactive when it is not bookmarked.
13.5. Create a new view to handle the rendering of the bookmarks in the UI and connect it to the controller to render the bookmarks when they are added or removed.
14. Implement Preview Views since both bookmark and search results have the same UI structure. 
14.1. Create a new view to handle the rendering of the recipe previews in both the bookmarks and search results views to avoid code duplication and keep the code maintainable.
14.2. Since we can't call directly Preview._generatemarkup() inside results view and bookmark view, we modify render method in the view to return the generated markup instead of rendering it directly in the UI. 
14.3. This way we can call the render method in the preview view to get the generated markup and use it in both the results view and bookmark view to render the recipe previews in the UI.
15. Implement local storage to store the bookmarks so that they persist even after the page is refreshed.
15.1. Create new method in the model to save the bookmarks to local storage whenever a bookmark is added or removed.
15.2. Create new method in the model to load the bookmarks from local storage when the application is initialized and set the state of the bookmarks accordingly.
15.3. Call the method to load bookmarks from local storage in the init function to ensure that the bookmarks are loaded when the application starts and rendered in the UI.
16. Create add recipe functionality to allow users to add their own recipes to the application and have them rendered in the UI.
16.1. Create a handler in the view  and call it using constructor in addRecipeView to toggle form popup when the add recipe button clicked both overlay and form elements should toggle hidden class.
16.2. Create new handler which handles form submission and inside it get form data using [...new FormaData()] and convert it into an object using Object.fromEntries() and
16.3. Pass this data to the controller function to handle the logic for adding a new recipe.
17. Upload new recipe into the API and render it in the UI
17.1. process of upload recipe: create request body --> create ingradient array from form data into appropiate format --> send api request to uplodad recipe
17.2. Create new method in modal to handle request body.
17.3. Modify ingrediant data from form into format required by API (quantity, unit, description) and create an array of ingrediants to be sent in the request body.
17.4. Modify form data to match the API requirements (title, source_url, image_url, publisher, cooking_time, servings) and create a new recipe object to be sent in the request body.
17.5. Send API request to upload the new recipe and handle POST response.
17.6. Add bookmarks data and API key into POSt response and render success, message, close popup and open the new recipe in the UI.
17.7. Render bookmark view to show the new recipe in the bookmarks list after it is added.
17.8. Update URL with the new recipe ID without reloading the page using window.history.pushState() method to allow users to share the URL of the newly added recipe and access it directly.
18. Final Wrap up considerations
18.1. Implement JSDOC comments for all functions and methods to improve code readability and maintainability.
18.2. Implement Pagination to display all the page numbers
18.3. Implement sorting functionality to sort the search results based on different criteria like cooking time, popularity, etc.    
*/

// Summary from the above points: expected 10 - 15 points based on feature. I expect each feature should cover 1 points. Also Expects high level overview.
// 1. Create controller(handle events, communcaition b/w modal and View), model, view, helper, config files and set up MVC architecture for the application. Handle API calls in the model, rendering in the view and logic in the controller.
// 2. Fetch a recipe from the API and render it in the UI when a user selects a recipe from the side menu. Use hashchange and load events to handle this functionality.
// 3. Implement search functionality to allow users to search for recipes based on a query and render the search results in the UI.
// 4. Implement pagination functionality for search results to allow users to navigate through multiple pages of search results.
// 5. Implement update recipe servings functionality to allow users to adjust the number of servings for a recipe and update the ingredient quantities accordingly.
// 6. Implement bookmark functionality to allow users to bookmark their favorite recipes and view them in a separate bookmarks view.
// 7. Implement preview views for both bookmarks and search results to avoid code duplication and keep the code maintainable.
// 8. Implement local storage to store the bookmarks so that they persist even after the page is refreshed.
// 9. Create add recipe functionality to allow users to add their own recipes to the application and have them rendered in the UI.
// 10. Upload new recipe into the API and render it in the UI after it is added.
// 11. Final wrap up considerations including implementing JSDOC comments for all functions and methods, implementing pagination to display all the page numbers, and implementing sorting functionality to sort the search results based on different criteria like cooking time, popularity, etc.
// 12. Important URL's: https://forkify-api.jonas.io/, https://jsdoc.app/, https://spoonacular.com/food-api
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Load State
    recipeView.renderSpinner();

    // 2. Loding Recipe
    await model.loadRecipe(id);

    const recipe = model.state;

    // 3. Render Recipe
    recipeView.render(recipe);
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

// showRecipe();

// 3. User select recipe from the side menu, it should open the recipe in the UI. Use haschange, load event and guard clauses to implement this feature
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));

// const controlRecipes = async function () {
//   try {
//     const id = window.location.hash.slice(1);
//     if (!id) return;

//     // Load State
//     recipeView.renderSpinner();

//     // 2. Loding Recipe
//     await model.loadRecipe(id);

//     const recipe = model.state;

//     // 3. Render Recipe
//     recipeView.render(recipe);
//   } catch (err) {
//     recipeView.renderError();
//   }
// };

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.searchRecipe(query);

    // Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state);
};

const controlBookmark = function () {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // Update recipe view
  recipeView.update(model.state);

  // Render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = function (newRecipe) {
  try {
    //1) Send recipe data into modal
    model.uploadRecipe(newRecipe);

    //2) Render recipe in UI
    recipeView.render(model.state.recipe);

    //3) Render success message
    addRecipeView.renderMessage();

    //4) Render Spinner
    addRecipeView.renderSpinner();

    //5) Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    //4) Render bookmark view
    bookmarkView.render(model.state.bookmarks);

    //5) Change ID in URL without reloading the page
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandleRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);

  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

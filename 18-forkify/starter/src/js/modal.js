// Modal functionality will be implemented here
// Handles state and business logic of the application
import { API_URL, RES_PER_PAGE, API_KEY } from './config';
import { getJSON, sendJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    // const recipe = data.data.recipe;
    // let { recipe } = data.data;
    // recipe = {
    //   id: recipe.id,
    //   title: recipe.title,
    //   publisher: recipe.publisher,
    //   sourceUrl: recipe.source_url,
    //   image: recipe.image_url,
    //   servings: recipe.servings,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };
    const recipe = createRecipeObject(data);
    recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === id);
    state.recipe = recipe;
  } catch (err) {
    throw err;
  }
};

export const searchRecipe = async function (query) {
  try {
    //state.search.query = 'pizza';
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${state.search.query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const loadBookmarks = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    // 1) Convert the data from the form into the format required by the API
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        if (ing[1].split(',').length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format: "Quantity,Unit,Description"',
          );
        const ingArr = ing[1].split(',').map(el => el.trim());
        return {
          quantity: ingArr[0] ? +ingArr[0] : null,
          unit: ingArr[1],
          description: ingArr[2],
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // 2) Send the recipe data to the API
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);

    // 3) Upload the new recipe data to the state
    state.recipe = createRecipeObject(data);

    // 4) Add the new recipe to bookmarks
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  loadBookmarks();
};

init();

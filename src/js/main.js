'use strict';

// Add HTML variables
const searchText = document.querySelector('.js-searchText');
const searchButton = document.querySelector('.js-searchButton');
const resetButton = document.querySelector('.js-resetButton');
const cocktailList = document.querySelector('.js-cocktailList');
const cocktailFavourites = document.querySelector('.js-cocktailFavourites');
let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

// Create an array to add items
let cocktailsArray=[];
let favouritesArray=[];

// Access the API doing fetch
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // Add object elements from API
    console.log(data);
    cocktailsArray = data.drinks;
    renderCocktailList(cocktailsArray);}
  );

// --------------FUNCTIONS--------------
function renderCocktailList(cocktailsArray) {
  cocktailList.innerHTML = '';
  for (const cocktail of cocktailsArray){
    cocktailList.innerHTML += renderCocktails(cocktail); }
  // addEventToPalette();
}
// Function: add li-s to the list ul
function renderCocktails(cocktail){
  let html=`<li class="cocktailLiStyle">
        <article>
            <img src="${cocktail.strDrinkThumb}" alt="Cocktail picture" class="cocktailImgStyle">
            <h3 class="cocktailTitle">${cocktail.strDrink}</h3>
        </article>
    </li> `;
  return html;
}
// Search button
function handleSearch(event){
  event.preventDefault();
  url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText.value}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
    // Add object elements from API
      console.log(data);
      cocktailsArray = data.drinks;
      renderCocktailList(cocktailsArray);}
    );
}
// Reset button
function handleReset(){
  console.log('hola 1');
  url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
  console.log('hola 2');
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
    // Add object elements from API
      console.log(data);
      cocktailsArray = data.drinks;
      renderCocktailList(cocktailsArray);}
    );
  searchText.value = '';
  console.log('hola');
}

// --------------EVENTS--------------
searchButton.addEventListener('click', handleSearch);
resetButton.addEventListener('click', handleReset);


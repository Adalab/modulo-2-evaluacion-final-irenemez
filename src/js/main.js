'use strict';

// Add HTML variables
const searchText = document.querySelector('.js-searchText');
const searchButton = document.querySelector('.js-searchButton');
const searchReset = document.querySelector('.js-searchReset');
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

function renderCocktailList(cocktailsArray) {
  console.log('Hola');
  cocktailList.innerHTML = '';
  for (const cocktail of cocktailsArray){
    cocktailList.innerHTML += renderCocktails(cocktail); }
  // addEventToPalette();
  console.log('Hola');
}

// Function: add li-s to the list ul
function renderCocktails(cocktail){
  let html=`<li>
        <article>
            <img src="${cocktail.strDrinkThumb}" alt="Cocktail picture">
            <h3 class="cocktailTitle">${cocktail.strDrink}</h3>
        </article>
    </li> `;
  return html;
}

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

searchButton.addEventListener('click', handleSearch);


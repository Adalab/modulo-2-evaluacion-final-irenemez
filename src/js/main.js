'use strict';

// -------------------VARIABLES-------------------
const searchText = document.querySelector('.js-searchText');
const searchButton = document.querySelector('.js-searchButton');
const resetButton = document.querySelector('.js-resetButton');
const cocktailList = document.querySelector('.js-cocktailList');
const cocktailFavourites = document.querySelector('.js-cocktailFavourites');
let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
// Create arrays to add items
let cocktailsArray=[];
let favouritesArray=[];


// Restore local storage info
const localFavourites = JSON.parse(localStorage.getItem('localFavourites'));
if (localFavourites) {
  favouritesArray = localFavourites;
  renderFavouriteList(favouritesArray);
}

// -------------------ACCESS API-------------------
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // Add object elements from API
    console.log(data);
    cocktailsArray = data.drinks;
    renderCocktailList(cocktailsArray);
  }
  );

// -------------------FUNCTIONS-------------------
// Function: render cocktail list
function renderCocktailList(cocktailsArray) {
  cocktailList.innerHTML = '';
  for (const cocktail of cocktailsArray){
    cocktailList.appendChild(renderCocktails(cocktail, 'js-cocktailElement')); 
    setListener();
  }
}

function renderFavouriteList(favouritesArray) {
  cocktailFavourites.innerHTML = '';
  for (const cocktail of favouritesArray){
    cocktailFavourites.appendChild(renderCocktails(cocktail, 'js-fav')); 
    setListener();
  }
  localStorage.setItem('localFavourites', JSON.stringify(favouritesArray));
}

// Function: RENDER (add li-s to the list ul)
function renderCocktails(cocktail, className ){
 
  let imgCocktail='';
  if(!cocktail.strDrinkThumb){
    imgCocktail=`https://via.placeholder.com/600x400/ffffff/a0c3d2?text=Cocktail ${cocktail.strDrink}`;
  } else imgCocktail=cocktail.strDrinkThumb;


  // DOM li and attributes
  const cocktailLi= document.createElement('li');
  cocktailLi.classList.add('cocktailLiStyle');


  const indexCocktail = favouritesArray.findIndex((favourite) => favourite.idDrink === cocktail.idDrink);
  if (indexCocktail !== -1){
    cocktailLi.classList.add('selected');
  } 

  cocktailLi.classList.add(className);
  cocktailLi.setAttribute('id', cocktail.idDrink);
  
  // DOM article
  const cocktailArticle = document.createElement('article');
  cocktailLi.appendChild(cocktailArticle);
  // DOM image
  const cocktailImg = document.createElement('img');
  cocktailImg.classList.add('cocktailImgStyle');
  cocktailImg.setAttribute('src', imgCocktail);
  cocktailImg.setAttribute('alt', 'Cocktail picture');
  cocktailArticle.appendChild(cocktailImg);
  // DOM title
  const cocktailTitle = document.createElement('h3');
  cocktailTitle.classList.add('cocktailTitle');
  const cocktailTitleText = document.createTextNode(`${cocktail.strDrink}`);
  cocktailTitle.appendChild(cocktailTitleText);
  cocktailLi.appendChild(cocktailTitle);
  // Print li objects
  console.log(cocktail);
  return cocktailLi;
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
      renderCocktailList(cocktailsArray);
    }
    );
}
// Reset button
function handleReset(){
  console.log('hola 1');
  url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
    // Add object elements from API
      console.log(data);
      cocktailsArray = data.drinks;
      renderCocktailList(cocktailsArray);
    }
    );
  searchText.value = '';
  cocktailFavourites.innerHTML = '';
  localStorage.removeItem('localFavourites');
  location.reload();
}

// Favourite button
function handleFavourite(event){
  // Display target element's ID on console
  const currentCocktailId = event.currentTarget.id;
  console.log(currentCocktailId);
  event.currentTarget.classList.toggle('selected');
  const selectedCocktail = cocktailsArray.find((favourite) => favourite.idDrink === currentCocktailId);
  // Search items by ID
  const indexCocktail = favouritesArray.findIndex((favourite) => favourite.idDrink === currentCocktailId);
  if (indexCocktail === -1){
    // Add selected element in favourites' array
    favouritesArray.push(selectedCocktail);
  } else {
    // Remove selected element in favourites' array
    favouritesArray.splice(indexCocktail, 1);
  }
  // Print favourites' array
  renderFavouriteList(favouritesArray);
  
}
// Element selector
function setListener(){
  const cocktailElements = document.querySelectorAll('.js-cocktailElement'); 
  console.log(cocktailElements);
  for (const li of cocktailElements){
    li.addEventListener('click', handleFavourite);
  }
}

// -------------------EVENTS-------------------
searchButton.addEventListener('click', handleSearch);
resetButton.addEventListener('click', handleReset);
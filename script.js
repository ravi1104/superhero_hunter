const resultDiv = document.getElementById("result");
const apiUrl =
  "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=fdeb3f85bfe23ee3a791b0f4c7ec18b9&hash=56a9ac5e3abbfa45fa88140cd53af50b";

// Function to fetch Marvel characters data
var fetchData = function () {
  // Use the fetch API to make the request
  fetch(apiUrl)
    .then((response) => {
      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((jsonData) => {
      // Now you have the JSON data as an object
      // You can work with it here
      const characters = jsonData.data.results;

      // Call the renderCharList function to display character data
      renderCharList(characters);
    })
    .catch((error) => {
      // Handle errors
      console.error("Fetch error:", error);
      resultDiv.textContent = "An error occurred while fetching data.";
    });
};

// Function to render the list of Marvel characters
function renderCharList(characters) {
  const charListUl = document.getElementById("charList");
  charListUl.innerHTML = ""; // Clear previous list if any

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    const li = document.createElement("li");
    li.className = "character";
  
    const imageSrc = `${character.thumbnail.path.replace("http://", "https://")}.${character.thumbnail.extension}`;
  
    li.innerHTML = `
      <div class="image-div">
        <img class="charImg" src="${imageSrc}" alt="">
      </div>
      <div class="details">
        <p class="name">${character.name}</p>
        <p class="comics">Comics: ${character.comics.available}</p>
        <p class="series">Series: ${character.series.available}</p>
        <p class="stories">Stories: ${character.stories.available}</p>
      </div>
    `;
  

  

    charListUl.appendChild(li);
  }
}

// Initial data fetch
fetchData();

var search_btn = document.getElementById("searchButton");
search_btn.addEventListener("click", search_characters);

// Function to search Marvel characters
function search_characters() {
  var input = document.getElementById("search-input");
  var userData = input.value;
  const search_url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${userData}&ts=1&apikey=fdeb3f85bfe23ee3a791b0f4c7ec18b9&hash=56a9ac5e3abbfa45fa88140cd53af50b`;

  var searchResults = document.getElementById("search_list");

  // Fetch data from the search_url
  fetch(search_url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((jsonData) => {
      // Clear previous search results
      searchResults.innerHTML = "";

      const bar = document.createElement("div");
      bar.className = "bar";
      bar.innerHTML = `<div><a href="./index.html">x</a></div>`;
      searchResults.appendChild(bar);

      // Display search results
      const characters = jsonData.data.results;
      for (let i = 0; i < characters.length; i++) {
        const character = characters[i];
        const searchItem = document.createElement("div");
        searchItem.className = "search-item";
        searchItem.innerHTML = `
          <div style="display: flex; align-items: center; flex-direction:row;">
            <a href="./Characters/character.html?character=${character.id}">
              <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            </a>
            <a href="./Characters/character.html?character=${character.id}">
              <p class="fs-3">${character.name}</p>
            </a>
            <i class="fa-regular fa-heart text-danger favoriteBtn fs-3 m-4 " style="cursor:pointer;"></i>
          </div>
        `;

        // Add an event listener to the "Favorite" button
        const favoriteBtn = searchItem.querySelector(".favoriteBtn");
        favoriteBtn.addEventListener("click", () => {
          addToFavorites(character);
        });

        searchResults.appendChild(searchItem);
      }

      // Show the search results
      searchResults.style.display = "flex";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      searchResults.textContent = "An error occurred while fetching data.";
    });
}

// Function to save favorite superheroes to localStorage
function saveFavoritesToLocalStorage(favorites) {
  localStorage.setItem("favoriteSuperheroes", JSON.stringify(favorites));
}

// Function to load favorite superheroes from localStorage
function loadFavoritesFromLocalStorage() {
  const storedFavorites = localStorage.getItem("favoriteSuperheroes");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

// Function to add a superhero to the favorite list
function addToFavorites(superhero) {
  // Get the current favorite list from localStorage
  const favorites = loadFavoritesFromLocalStorage();

  // Add the superhero to the favorites array
  favorites.push(superhero);

  // Save the updated favorites to localStorage
  saveFavoritesToLocalStorage(favorites);
}

// Function to load favorite superheroes from localStorage
function loadFavoritesFromLocalStorage() {
    const storedFavorites = localStorage.getItem("favoriteSuperheroes");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
}

// Function to display favorite superheroes on the "favorites.html" page
function displayFavorites() {
    const favorites = loadFavoritesFromLocalStorage();
    const favoriteList = document.getElementById("favoriteList");

    for (const superhero of favorites) {
        createFavoriteCard(superhero, favoriteList);
    }
}

// Function to create a favorite superhero card
function createFavoriteCard(superhero, favoriteList) {
    const listItem = document.createElement("div");
    listItem.className = "favorite-item";
    const imageSrc = `${superhero.thumbnail.path.replace("http://", "https://")}.${superhero.thumbnail.extension}`;
 
    listItem.innerHTML = `
        <div class="card m-2" style="width: 18rem;">
            <img src="${imageSrc}" class="card-img-top" alt="${superhero.name}">
            <div class="card-body">
                <p class="card-text">${superhero.name}</p>
            </div>
        </div>
    `;

    favoriteList.appendChild(listItem);
}

// Function to add a superhero to favorites and update localStorage
function addToFavorites(superhero) {
    // Save the updated favorites list to localStorage
    const favorites = loadFavoritesFromLocalStorage();
    favorites.push(superhero);
    localStorage.setItem("favoriteSuperheroes", JSON.stringify(favorites));
}

// Function to clear favorite superheroes and update localStorage
function clearFavorites() {
    localStorage.removeItem("favoriteSuperheroes");
    const favoriteList = document.getElementById("favoriteList");
    favoriteList.innerHTML = ""; // Clear the displayed favorites
}

var clearBtn = document.getElementById('clearFavoritesButton');
clearBtn.addEventListener('click', clearFavorites);

// Load favorite superheroes and display them when the "favorites.html" page loads
window.addEventListener("load", displayFavorites);

var search_btn = document.getElementById("searchButton");
search_btn.addEventListener('click', search_characters);

function search_characters() {
    var input = document.getElementById("search-input");
    var userData = input.value;
    const search_url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${userData}&ts=1&apikey=fdeb3f85bfe23ee3a791b0f4c7ec18b9&hash=56a9ac5e3abbfa45fa88140cd53af50b`;

    var searchResults = document.getElementById("search_list");

    // Fetch data from the search_url
    fetch(search_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(jsonData => {
            // Clear previous search results
            searchResults.innerHTML = "";

            const bar = document.createElement("div");
            bar.className = "bar";
            bar.innerHTML = `<div><a href="./favorites.html">x</a></div>`;
            searchResults.appendChild(bar);

            // Display search results
            const characters = jsonData.data.results;
            for (let i = 0; i < characters.length; i++) {
                const character = characters[i];
                const searchItem = document.createElement("div");
                searchItem.className = "search-item";
                const imagePath = character.thumbnail.path.replace("http://", "https://");
                const imageSrc = `${imagePath}.${character.thumbnail.extension}`;

                searchItem.innerHTML = `
                <div style="display: flex; align-items: center; flex-direction:row;">
                
                    <a href="../Characters/character.html?character=${character.id}">
                    <img src="${imageSrc}" alt="${character.name}">
                    </a><a href="../Characters/character.html?character=${character.id}">
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
        .catch(error => {
            console.error("Fetch error:", error);
            searchResults.textContent = "An error occurred while fetching data.";
        });
}

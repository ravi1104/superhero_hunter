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
            <button data-id="${superhero.id}" class="btn btn-outline-danger del-btn" type="button">Remove</button>
        </div>
    `;

    // Attach a click event listener to the "Remove" button
    const removeButton = listItem.querySelector(".del-btn");
    removeButton.addEventListener('click', () => {
        const superheroIdToRemove = removeButton.getAttribute("data-id");
        removeFavorite(superheroIdToRemove);
        listItem.remove(); // Remove the card from the display
    });

    favoriteList.appendChild(listItem);
}

// Function to remove a favorite superhero by ID
function removeFavorite(superheroIdToRemove) {
    const favorites = loadFavoritesFromLocalStorage();
    const updatedFavorites = favorites.filter(superhero => superhero.id != superheroIdToRemove);

    localStorage.setItem("favoriteSuperheroes", JSON.stringify(updatedFavorites));
    
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

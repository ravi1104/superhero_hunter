// Get the character ID from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const characterId = urlParams.get("character");
// Construct the URL to fetch character details by ID
const characterDetailsUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=fdeb3f85bfe23ee3a791b0f4c7ec18b9&hash=56a9ac5e3abbfa45fa88140cd53af50b`;

// Select the div where you want to display character details
const characterDetailsDiv = document.getElementById("character-details");

// Fetch character details from the API
fetch(characterDetailsUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })
  .then((jsonData) => {
    // Parse the response data
    const character = jsonData.data.results[0]; // Assuming the API returns a single character based on the ID
    
    // Create HTML content for character details
    const characterHTML = `
      <h2>${character.name}</h2>
      <img class="card-img-top" src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
      <div class="card-body">
      <p>Description: ${character.description || "No description available."}</p>
      <p>Comics: ${character.comics.available}</p>
      <p>Series: ${character.series.available}</p>
      <p>Stories: ${character.stories.available}</p>
      </div>

    `;

    // document.body.style.backgroundImage = `url(${character.thumbnail.path}.${character.thumbnail.extension})`;

    characterDetailsDiv.innerHTML = characterHTML;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
    characterDetailsDiv.textContent = "An error occurred while fetching character details.";
  });

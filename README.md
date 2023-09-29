# Superhero Hunter JS

## Description
Superhero Hunter JS is a web application that allows users to search for and explore information about superheroes from the Marvel Universe. It utilizes the Marvel API to fetch superhero data and provides a user-friendly interface for interacting with superhero-related content.

## Table of Contents
- Features
- API Integration
- Getting Started
- Usage
- Screenshots
- Persistence
- Video Explanation
- Technologies Used

## Features
The Superhero Hunter JS application offers the following features:

- **Home Page**:
  - Fetches and displays a list of superheroes from the Marvel API.
  - Provides a search bar for filtering superheroes based on user queries (e.g., "bat" for "Batman").
  - Allows users to add superheroes to their list of favorite superheroes.

- **Superhero Page**:
  - Displays detailed information about a selected superhero, including their name, photo, bio, and other data retrieved from the Marvel API (comics, events, series, stories, etc).

- **My Favorite Superheroes Page**:
  - Shows a list of all favorite superheroes.
  - Maintains the list's persistence, ensuring it remains the same even after closing and reopening the browser.
  - Provides a "Remove from Favorites" button for each superhero to remove them from the list.

## API Integration
Superhero Hunter JS integrates with the Marvel API to fetch superhero data. To use the API, you need to follow these steps:
1. Register on the [Marvel Developer Portal](https://developer.marvel.com/signup) to obtain public and private keys.
2. Generate an API request URL using the provided keys, timestamp (`ts`), and an MD5 hash of `ts + private-key + public-key`.

## Getting Started
To set up and run the Superhero Hunter JS application locally, follow these steps:
1. Clone this repository to your local machine.
   ```shell
   git clone https://github.com/ravi1104/superhero_hunter.git
3. Open the project folder in your code editor.
4. Ensure you have Node.js installed.
5. Install the required dependencies:
   ```shell
   npm install crypto-js

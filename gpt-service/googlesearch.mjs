import readline from "readline";
import fetch from "node-fetch";

// Define your API key and custom search engine ID
const apiKey = "AIzaSyDqHv4qXd8YciSSgMSVjHvfwE6OfXbPX0g";
const cx = "13b72e0aba5084ad3";

// Function to make the API call and print the results
async function makeAPICall(query) {
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("Search Results:");
    data.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}: ${item.link}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Create an interface for reading user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user for a query
rl.question("Enter your search query: ", (userQuery) => {
  makeAPICall(userQuery);
  rl.close();
});


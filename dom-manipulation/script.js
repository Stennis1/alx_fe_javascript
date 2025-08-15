// Array of quotes (initial data)
let quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
    { text: "Happiness depends upon ourselves.", category: "Philosophy" }
];

// Display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Create elements dynamically
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; // clear previous

    const quoteText = document.createElement("p");
    quoteText.textContent = `"${quote.text}"`;

    const quoteCategory = document.createElement("small");
    quoteCategory.textContent = `— ${quote.category}`;

    // Append elements to DOM
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Add new quote dynamically
function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        // Add to quotes array
        quotes.push({ text, category });

        // Feedback: show newly added quote immediately
        showRandomQuote();

        // Clear inputs
        textInput.value = "";
        categoryInput.value = "";
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Event Listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Initial quote on page load
showRandomQuote();

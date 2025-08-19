// storage keys 
const LS_KEY_QUOTES = 'dqg:quotes';
const SS_KEY_LAST_QUOTE = 'dqg:lastQuote';

// Utilities 
function saveQuotes() {
    localStorage.setItem(LS_KEY_QUOTES, JSON.stringify(quotes));
}

function loadQuotes() {
    const raw = localStorage.getItem(LS_KEY_QUOTES);
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed))
            {
                quotes = parsed.filter(isValidQuoteShape)
            }
        } catch (e) {
            console.warn("Invalid data in Local Storage, resetting.");
            saveQuotes();
        }
    } else {
        saveQuotes();
    }
}

function isValidQuoteShape() {
    return item && typeof item.text === 'string' && typeof item.category === 'string';
}

// default quotes 
let quotes = [
    {text: "Success is hard", category: "inspiration"},
    {text: "A person only truly dies when his name is uttered for the last time", category: "philosophy"},
    {text: "Thy art my rock and my shield", category: "biblical"}
]


function createAddQuoteForm() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
    
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        quotes.push({text, category});
        saveQuotes();
        showRandomQuote();

        textInput.value = "";
        categoryInput.value = "";
    } else {
        alert("Please enter a quote and its category!");
    }
}


function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = "";

    const quoteText = document.createElement('p');
    quoteText.textContent = `"${quote.text}"`;

    const quoteCategory = document.createElement('small');
    quoteCategory.textContent = `- ${quote.category}`;

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory)

    sessionStorage.setItem(SS_KEY_LAST_QUOTE, JSON.stringify(quote));
}


function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}


function exportToJsonFile() {
    const json = JSON.stringify(quotes, null, 2);
    const blob = new Blob([json], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `quotes-${Date.now()}.json`
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// Function to export quotes
function exportQuotes() {

}


function populateCategories() {

}


function fetchQuotesFromServer() {

}


// Event listeners 
document.getElementById('newQuote-btn').addEventListener('click', showRandomQuote)
document.getElementById('addQuote-btn').addEventListener('click', createAddQuoteForm)
document.getElementById('exportQuotes-btn').addEventListener('click', exportQuotes)

showRandomQuote();
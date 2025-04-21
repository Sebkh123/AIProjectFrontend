/*
async function translateText() {
    const sourceLanguage = document.getElementById('sourceLang').value;
    const targetLanguage = document.getElementById('targetLang').value;
    const text = document.getElementById('text').value;



    // First, detect the language of the text (if sourceLanguage is not provided)
    let detectedSourceLanguage = sourceLanguage;

    if (!detectedSourceLanguage) {
        // If sourceLanguage is not provided by the user, try to detect it
        detectedSourceLanguage = await detectLanguage(text);
    }

    const payload = {
        sourceLanguage,
        targetLanguage,
        text
    };

    const response = await fetch('http://localhost:8080/api/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('translatedText').value = data.translatedText;


    } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        document.getElementById('translatedText').value = data.errorText;
    }

}

 */





// Function to filter the options in the target language dropdown
function filterTargetLang() {
    const searchQuery = document.getElementById("targetLangSearch").value.toLowerCase();
    const targetLangOptions = document.getElementById("targetLang").options;

    // Loop through the dropdown options and show/hide based on the search query
    for (let i = 0; i < targetLangOptions.length; i++) {
        const option = targetLangOptions[i];
        const optionText = option.text.toLowerCase();

        if (optionText.includes(searchQuery)) {
            option.style.display = "block"; // Show matching option
        } else {
            option.style.display = "none"; // Hide non-matching option
        }
    }
}




// Function to detect language using an API (e.g., OpenAI, or a custom backend API)
async function detectLanguage(text) {
    try {
        const response = await fetch('http://localhost:8080/api/detectedLanguage', {  // Adjust the URL for language detection API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        if (response.ok) {
            const data = await response.json();
            return data.languageDetected;  // Assuming the API returns the detected language
        } else {
            console.error("Error detecting language:", await response.text());
            return 'en';  // Fallback to 'en' if language detection fails
        }
    } catch (error) {
        console.error("Error detecting language:", error);
        return 'en';  // Fallback to 'en' if there's an error
    }
}

// Function to update the detected language in the HTML
function showDetectedLanguage() {
    const textInput = document.getElementById("text").value;

    // Call the detectLanguage function with the provided text
    detectLanguage(textInput)
        .then(language => {
            // Update the span element with id "detectedLanguage"
            document.getElementById("detectedLanguage").innerText = language;
        })
        .catch(error => {
            console.error("Error updating detected language:", error);
            document.getElementById("detectedLanguage").innerText = "Error";
        });
}






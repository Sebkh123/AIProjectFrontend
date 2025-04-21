async function speakText() {
    const apiKey = 'sk_4d05939b95a2d7cdca15bd084364fb6e04fae6d49642bfda';
    /*const voiceId = 'EXAVITQu4vr4xnSDxMaL'; // Rachel*/
    const voiceId = document.getElementById('voiceSelect').value;
    const textToConvert = document.getElementById('translatedText').value;

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
            'xi-api-key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
            text: textToConvert,
            model_id: 'eleven_monolingual_v1', // Required
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75
            }
        })
    });

    if (!response.ok) {
        console.error('Failed to fetch audio:', response.statusText);
        return;
    }

    // Convert response to blob and play
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
}




async function translateText() {
    const sourceLanguage = document.getElementById('sourceLang').value;
    const targetLanguage = document.getElementById('targetLang').value;
    const text = document.getElementById('text').value;

    // First, detect the language of the text (if sourceLanguage is not provided)
    let detectedSourceLanguage = sourceLanguage;

    if (!detectedSourceLanguage) {
        detectedSourceLanguage = await detectLanguage(text);
    }

    const payload = {
        sourceLanguage,
        targetLanguage,
        text,
        includeSuggestions: true
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

        // Log the data to ensure it's correct
        console.log("Backend Response: ", data);

        // Set the translated text in the translatedText textarea (NOT in suggestionsList)

        document.getElementById('translatedText').value = data.translatedText.split('\n')[0];


        // Clear previous suggestions in the suggestions list
        const suggestionsList = document.getElementById("suggestionsList");
        suggestionsList.innerHTML = "";

        // If suggestions exist and are an array, display them
        if (Array.isArray(data.suggestions) && data.suggestions.length > 0) {
            data.suggestions.forEach(suggestion => {
                const li = document.createElement("li");
                li.textContent = suggestion;
                li.style.cursor = "pointer";

                // When clicked, show the suggestion in the otherSuggestions div
                li.onclick = () => {
                    fetchWordDefinition(suggestion)
                };

                // Append the suggestion to the list
                suggestionsList.appendChild(li);
            });
        } else {
            // If no suggestions are available, show a message in the suggestions list
            suggestionsList.innerHTML = "<li></li>";
        }

    } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        document.getElementById('translatedText').value = "Error: " + errorText;
    }
}

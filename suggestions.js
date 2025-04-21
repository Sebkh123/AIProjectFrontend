

    const suggestionsList = document.getElementById("suggestionsList");

    suggestionsList.addEventListener("click", function(e) {
        // Check if a list item with the class "suggestion" was clicked
        if (e.target && e.target.matches("li.suggestion")) {
            e.preventDefault();
            const word = e.target.getAttribute("data-word");
            fetchWordDefinition(word);
        }
    });


    // Fetch word definition from the Free Dictionary API
    function fetchWordDefinition(word) {
        // Note: For dictionaryapi.dev you do not need an API key.
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;



        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Check if the expected data structure exists.
                if (Array.isArray(data) && data.length > 0) {
                    // Try to safely access the first definition.
                    const firstEntry = data[0];

                    // Check if meanings exist and have definitions.
                    if (firstEntry.meanings && firstEntry.meanings.length > 0) {
                        const firstMeaning = firstEntry.meanings[0];
                        if (firstMeaning.definitions && firstMeaning.definitions.length > 0) {
                            const definition = firstMeaning.definitions[0].definition;
                            showDefinitionPopup(definition);
                            return;
                        }
                    }
                }
                // Fallback if the expected data format was not found.
                showDefinitionPopup("Sorry, no definition found.");
            })
            .catch(error => {
                console.error('Error fetching definition:', error);
                showDefinitionPopup("Sorry, no definition found.");
            });
    }

    // Display the definition in the popup
    function showDefinitionPopup(definition) {
        const popup = document.getElementById("definitionPopup");
        const definitionElement = document.getElementById("definition");
        const closePopup = document.getElementById("closePopup");

        definitionElement.textContent = definition;
        popup.style.display = "block";

        // Close popup when clicking close button
        closePopup.addEventListener("click", function() {
            popup.style.display = "none";
        });
    }



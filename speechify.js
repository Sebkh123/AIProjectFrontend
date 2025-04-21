
    const apiKey = 'hC7lNCVj_vcmJhSOLHBZiRi7Rm1xFnPAuUPklOGP4hE=';
    const url = 'https://api.sws.speechify.com/v1/audio/speech';



    async function speakText() {
        const textToConvert = document.getElementById('translatedText').value;
        const voiceId = 'en_us_male';  // You can adjust this based on your preference

        // Construct the request body as a JSON string
        const requestBody = JSON.stringify({
            input: textToConvert,  // Text to convert to speech
            voice_id: voiceId     // Voice ID for the speech
        });

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,  // Authorization with API key
                'Content-Type': 'application/json'
            },
            body: requestBody
        };

        try {
            const response = await fetch(url, options);

            // Check if the response is OK (status 200)
            if (!response.ok) {
                const errorText = await response.text();  // Capture error text
                throw new Error(`Error: ${errorText}`);
            }

            const data = await response.json();  // Parse JSON response
            console.log(data);  // Log the response data to console

            // Assuming the response contains a URL for the audio file
            const audioUrl = data.audio_url;  // This might vary based on the actual API response
            const audio = new Audio(audioUrl);
            audio.play();  // Play the audio

        } catch (error) {
            console.error('Error:', error);  // Catch and log any errors
        }
    }
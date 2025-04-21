async function speakText() {
    const textToConvert = document.getElementById('translatedText').value;

    const url = 'https://open-ai-text-to-speech1.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '00c773c54dmsh43c85cfc94b91b5p1b00b4jsn022a24a5e79e',
            'x-rapidapi-host': 'open-ai-text-to-speech1.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'tts-1',
            input: textToConvert, // 👈 This is the key part
            instructions: 'Speak in a lively and optimistic tone.',
            voice: 'alloy'
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        // If the result contains an audio URL, play it
        if (result.audio_url) {
            const audio = new Audio(result.audio_url);
            audio.play();
        }

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function speakText() {
    const text = document.getElementById('translatedText').value;
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}
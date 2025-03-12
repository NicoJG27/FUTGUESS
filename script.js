let countryData;

async function getRandomCountry() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    countryData = countries[Math.floor(Math.random() * countries.length)];
    console.log("País seleccionado:", countryData.name.common); // Debug
}

function checkAnswer() {
    const userGuess = document.getElementById('guess').value.trim().toLowerCase();
    const correctAnswer = countryData.name.common.toLowerCase();
    
    if (userGuess === correctAnswer) {
        document.getElementById('feedback').textContent = "¡Correcto! Era " + countryData.name.common;
    } else {
        document.getElementById('feedback').textContent = "Incorrecto. Intenta de nuevo.";
    }
}

getRandomCountry();

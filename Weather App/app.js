function getWeather() {
    const city = document.getElementById("inputText").value;

    // First, get the latitude and longitude for the city
    getCityCoordinates(city)
        .then(coords => {
            if (!coords) {
                throw new Error('City not found');
            }
            const { latitude, longitude } = coords;

            // Use the coordinates to get weather information
            return getWeatherData(latitude, longitude);
        })
        .then(data => {
            const temperature = data.current_weather.temperature; // Current temperature
            const description = data.current_weather.weathercode; // Weather description

            // Display results
            document.getElementById("temperature").textContent = `Temperature: ${temperature}°C`;
            document.getElementById("description").textContent = `Condition: ${description}`;
        })
        .catch(error => {
            console.error('Error:', error); // Handle any errors
            document.getElementById("temperature").textContent = 'Error fetching weather data.';
            document.getElementById("description").textContent = '';
        });
}

function getCityCoordinates(city) {
    // Open-Meteo doesn't provide city lookup, so we need a geocoding service
    const geocodingAPI = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`;
    return fetch(geocodingAPI)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                return null;
            }
            return {
                latitude: data[0].lat,
                longitude: data[0].lon
            };
        });
}

function getWeatherData(latitude, longitude) {
    const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    return fetch(weatherAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        });
}

let header = document.getElementById("header");
function alerta(){
    header.style.color = " #3b82f6"

}
function alertb(){
    header.style.color = "#172554"

}

setTimeout(alerta, 1000);
setTimeout(alertb,2000)

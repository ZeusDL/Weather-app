const locationInput = document.getElementById('location');
const getWeatherButton = document.getElementById('getWeather');
const weatherInfo = document.getElementById('weather-info');
const temperatureDisplay = document.getElementById('temperature');
const descriptionDisplay = document.getElementById('description');
const humidityDisplay = document.getElementById('humidity');
const windDisplay = document.getElementById('wind');
const locationNameDisplay = document.getElementById('location-name');
const weatherIconDisplay = document.getElementById('weather-icon');

const apiKey = 'bd533d3ec531459b98891951250902'; // Your API key here when you want to create for yourself

getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        getWeatherData(location);
    } else {
        alert("Please enter a location.");
    }
});

async function getWeatherData(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`);
        const data = await response.json();

        if (!data || !data.current) {
            throw new Error("Location not found or API error.");
        }

        const temperature = data.current.temp_c;
        const description = data.current.condition.text;
        const humidity = data.current.humidity;
        const windSpeed = data.current.wind_kph;
        const cityName = data.location.name;
        const country = data.location.country;
        const iconUrl = data.current.condition.icon;

        temperatureDisplay.textContent = `Temperature: ${temperature}°C`;
        descriptionDisplay.textContent = `Description: ${description}`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        windDisplay.textContent = `Wind Speed: ${windSpeed} km/h`;
        locationNameDisplay.textContent = `Location: ${cityName}, ${country}`;

        weatherIconDisplay.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;

        weatherInfo.style.display = 'block';

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(error.message);
        weatherInfo.style.display = 'none';
    }
}
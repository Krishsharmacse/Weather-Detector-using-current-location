const button = document.getElementById("get-location-button");
const cityInput = document.getElementById("city-input"); 
const searchButton = document.getElementById("search-button"); 

async function getData(lat, long) {
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=72cb2d0878d44c2aade164305241810&q=${lat},${long}&aqi=yes`
    );
    return await promise.json();
}

async function getDataByCity(city) {
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=72cb2d0878d44c2aade164305241810&q=${city}&aqi=yes`
    );
    return await promise.json();
}

if (!button) {
    console.error("Button element not found");
}

async function gotLocation(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(`Latitude: ${lat}, Longitude: ${long}`); 
    const result = await getData(lat, long);
    console.log(result);
    const temperature = result.current.temp_c;

    alert(`Your location:\nLatitude: ${lat}\nLongitude: ${long}\nTemperature: ${temperature}°C`);
}

async function searchWeatherByCity() {
    const city = cityInput.value.trim();
    if (city) {
        const result = await getDataByCity(city);
        console.log(result);
        const temperature = result.current.temp_c;

        alert(`City: ${city}\nTemperature: ${temperature}°C`);
    } else {
        alert("Please enter a city name.");
    }
}

function failedToGet(error) {
    console.error("Error getting location:", error);
    alert("Unable to retrieve your location. Please check your location settings or permissions.");
}

button.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.error("Geolocation API not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});

searchButton.addEventListener('click', searchWeatherByCity); 
// thankyou
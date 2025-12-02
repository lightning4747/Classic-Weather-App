const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const api = "OPEN_WEATHER_API_KEY";

weatherform.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityinput.value.trim();
    
    if(city) {
        try {
            const weatherData = await getweatherData(city);
            displayweatherinfo(weatherData);
            console.log(weatherData);
        }
        catch(error) {
            console.error(error);
            displayerror(error);
        }

    }
    else {
        displayerror("please enter a city");
    }

});

async function getweatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;

    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error("could not get the result");
    }

    return await response.json();
}



function displayweatherinfo(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${temp.toFixed(1)} °C`;
    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    descdisplay.textContent = description;
    weatheremoji.textContent = getweatherEmoji(id);

    card.append(
        citydisplay,
        tempdisplay,
        humiditydisplay,
        descdisplay,
        weatheremoji
    );

    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    descdisplay.classList.add("descdisplay");
    weatheremoji.classList.add("weatheremoji");
}



function getweatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
    if (weatherId >= 300 && weatherId < 500) return "🌦️"; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return "🌧️"; // Rain
    if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
    if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Atmosphere
    if (weatherId === 800) return "☀️"; 
    if (weatherId > 800 && weatherId < 900) return "☁️"; // Clouds
    return "🌡️"; 
}

function displayerror(err) {
    card.textContent = "";
    card.style.display = "flex";

    const errordisplay = document.createElement("p");
    errordisplay.textContent = err;
    errordisplay.classList.add("errordisplay");

    card.appendChild(errordisplay);
}


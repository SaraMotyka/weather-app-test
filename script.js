let weather = {
    apiKey: "0c19bb1f8518811d7b11d073dd199753",
    fetchWeather(city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}
                &units=metric&appid=${this.apiKey}`
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const roundedTemp = Math.round(temp);
        document.querySelector(".city").innerHTML = `Weather in ${name}`;
        document.querySelector(
            ".icon"
        ).src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".temp").innerHTML = `${roundedTemp}°C`;
        document.querySelector(".description").innerHTML = description;
        document.querySelector(
            ".humidity"
        ).innerHTML = `Humidity: ${humidity} %`;
        document.querySelector(".wind").innerHTML = `Wind speed: ${speed} km/h`;
    },
    searchCity() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};
window.addEventListener("load", function () {
    document.querySelector(".search-bar").value = "";
});
document.querySelector(".search button").addEventListener("click", function () {
    weather.searchCity();
});
document.querySelector(".search-bar").addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        weather.searchCity();
    }
});

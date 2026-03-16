// ============================================
// Weather App – JavaScript
// ============================================

// --- DOM References ---
const cityText = document.getElementById("city");
const temperatureText = document.getElementById("temperature");
const windText = document.getElementById("wind");
const fetchTimeText = document.getElementById("fetchTime");
const output = document.getElementById("output");

// State containers
const placeholderState = document.getElementById("placeholderState");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const dataState = document.getElementById("dataState");
const errorMessage = document.getElementById("errorMessage");
const retryBtn = document.getElementById("retryBtn");

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");

// All city buttons
const cityButtons = document.querySelectorAll(".city-btn");

// --- State ---
let lastRequest = null;
let isDark = localStorage.getItem("portfolio_theme") === "dark";

// --- City Data ---
const cities = {
    btnKuopio: { name: "Kuopio", lat: 62.89238, lon: 27.67703 },
    btnHelsinki: { name: "Helsinki", lat: 60.16952, lon: 24.93545 },
    btnStockholm: { name: "Stockholm", lat: 59.32938, lon: 18.06871 },
    btnKarlsruhe: { name: "Karlsruhe", lat: 49.00937, lon: 8.40444 },
    btnLondon: { name: "London", lat: 51.50853, lon: -0.12574 },
    btnTokyo: { name: "Tokyo", lat: 35.6895, lon: 139.69171 },
    btnNewYork: { name: "New York", lat: 40.71427, lon: -74.00597 },
    btnCanberra: { name: "Canberra", lat: -35.28125, lon: 149.12927 },
};

// --- Theme ---

function toggleTheme() {
    isDark = !isDark;

    if (isDark) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
        localStorage.setItem("portfolio_theme", "dark");
    } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
        localStorage.setItem("portfolio_theme", "light");
    }
}

function loadTheme() {
    if (isDark) {
        document.body.classList.add("dark");
    }
}

// --- Utility Functions ---

function log(message) {
    output.textContent += message + "\n";
}

function clearOutput() {
    output.textContent = "";
}

function showState(state) {
    placeholderState.hidden = true;
    loadingState.hidden = true;
    errorState.hidden = true;
    dataState.hidden = true;

    if (state === "placeholder") placeholderState.hidden = false;
    if (state === "loading") loadingState.hidden = false;
    if (state === "error") errorState.hidden = false;
    if (state === "data") dataState.hidden = false;
}

function setActiveButton(activeId) {
    cityButtons.forEach(function (btn) {
        btn.classList.remove("active");
    });
    const activeBtn = document.getElementById(activeId);
    if (activeBtn) {
        activeBtn.classList.add("active");
    }
}

function formatTime(date) {
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

// --- Weather Fetching ---

async function loadWeatherByCity(cityName, latitude, longitude) {
    clearOutput();
    showState("loading");

    lastRequest = { cityName, latitude, longitude };

    try {
        const url =
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            latitude +
            "&longitude=" +
            longitude +
            "&current=temperature_2m,wind_speed_10m";

        log("Fetching: " + url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        const data = await response.json();

        log("Response received.");
        log(JSON.stringify(data, null, 2));

        const temperature = data.current.temperature_2m;
        const wind = data.current.wind_speed_10m;

        cityText.textContent = cityName;
        temperatureText.textContent = temperature + " °C";
        windText.textContent = wind + " km/h";
        fetchTimeText.textContent = formatTime(new Date());

        showState("data");

        log("---");
        log("City: " + cityName);
        log("Temperature: " + temperature + " °C");
        log("Wind Speed: " + wind + " km/h");
    } catch (error) {
        log("Error: " + error.message);
        errorMessage.textContent =
            "Could not load weather for " + cityName + ". " + error.message;
        showState("error");
    }
}

// --- Event Listeners ---

document.addEventListener("DOMContentLoaded", function () {
    loadTheme();

    showState("placeholder");

    themeToggle.addEventListener("click", toggleTheme);

    Object.keys(cities).forEach(function (btnId) {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("click", function () {
                const city = cities[btnId];
                setActiveButton(btnId);
                loadWeatherByCity(city.name, city.lat, city.lon);
            });
        }
    });

    retryBtn.addEventListener("click", function () {
        if (lastRequest) {
            loadWeatherByCity(
                lastRequest.cityName,
                lastRequest.latitude,
                lastRequest.longitude
            );
        }
    });
});
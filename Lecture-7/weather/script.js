// ============================================================
// DOM Element References
// ============================================================
const cityText = document.getElementById("city")
const temperatureText = document.getElementById("temperature")
const windText = document.getElementById("wind")
const timeText = document.getElementById("time")
const output = document.getElementById("output")
const weatherBox = document.getElementById("weatherBox")

// ============================================================
// Helper Functions
// ============================================================

function log(message) {
    output.textContent += message + "\n"
}

function clearOutput() {
    output.textContent = ""
}

// ============================================================
// Extension Task 1 — City Data and Button Wiring
// ============================================================

// Store city coordinates in one place for easy maintenance
const cities = {
    kuopio:   { name: "Kuopio",   latitude: 62.8924, longitude: 27.6770 },
    helsinki:  { name: "Helsinki", latitude: 60.1699, longitude: 24.9384 },
    oulu:     { name: "Oulu",     latitude: 65.0121, longitude: 25.4651 }
}

// Wire each button to the reusable function
document.getElementById("btnKuopio").onclick = function () {
    setActiveButton(this)
    loadWeatherByCity(cities.kuopio.name, cities.kuopio.latitude, cities.kuopio.longitude)
}

document.getElementById("btnHelsinki").onclick = function () {
    setActiveButton(this)
    loadWeatherByCity(cities.helsinki.name, cities.helsinki.latitude, cities.helsinki.longitude)
}

document.getElementById("btnOulu").onclick = function () {
    setActiveButton(this)
    loadWeatherByCity(cities.oulu.name, cities.oulu.latitude, cities.oulu.longitude)
}

// Visual feedback: highlight the selected city button
function setActiveButton(clickedButton) {
    const allButtons = document.querySelectorAll(".city-buttons button")
    allButtons.forEach(function (btn) {
        btn.classList.remove("active")
    })
    clickedButton.classList.add("active")
}

// ============================================================
// Part A + B + C + D — Reusable Weather Loader
// ============================================================

async function loadWeatherByCity(cityName, latitude, longitude) {
    clearOutput()

    // Show a loading state so the user knows something is happening
    cityText.textContent = "Loading..."
    temperatureText.textContent = "..."
    windText.textContent = "..."
    timeText.textContent = "..."
    weatherBox.classList.add("loading")

    // Part A — Build the API URL and fetch data
    const apiUrl =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" + latitude +
        "&longitude=" + longitude +
        "&current=temperature_2m,wind_speed_10m"

    // Part D — Error handling with try/catch
    try {
        const response = await fetch(apiUrl)

        // Check for HTTP errors (e.g. 404, 500)
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status)
        }

        // Part A — Convert response body to a JavaScript object
        const data = await response.json()

        // Print full object to the browser console for inspection
        console.log(data)

        // Part B — Read the correct nested fields
        const temperature = data.current.temperature_2m
        const wind = data.current.wind_speed_10m

        // Extension Task 2 — Read time of the weather reading
        const dataTime = data.current.time

        // Part B — Update the DOM elements
        cityText.textContent = cityName
        temperatureText.textContent = temperature + " °C"
        windText.textContent = wind + " km/h"
        timeText.textContent = dataTime

        // Part C — Also print results into the output area
        log("City: " + cityName)
        log("Temperature: " + temperature + " °C")
        log("Wind Speed: " + wind + " km/h")
        log("Time: " + dataTime)

        // Extension Task 3 — Change background based on temperature
        if (temperature < 0) {
            document.body.className = "cold"
            log("Status: Cold ❄️")
        } else {
            document.body.className = "mild"
            log("Status: Mild ☀️")
        }

    } catch (error) {
        // Part D — Show error to the user
        log("Error: " + error.message)

        cityText.textContent = "Error"
        temperatureText.textContent = "-"
        windText.textContent = "-"
        timeText.textContent = "-"
    } finally {
        // Remove loading indicator regardless of success or failure
        weatherBox.classList.remove("loading")
    }
}
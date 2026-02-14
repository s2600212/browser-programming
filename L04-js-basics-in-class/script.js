"use strict";

// ===================================
// CONSOLE + VARIABLES
// ===================================

// Console log #1: Page loaded
console.log("JavaScript file loaded successfully!");

// Variables: DOM element references (const)
const btnTheme = document.getElementById("btnTheme");
const btnCount = document.getElementById("btnCount");
const counterDisplay = document.getElementById("counterDisplay");
const themeStatus = document.getElementById("themeStatus");

// Console log #2: Initial setup
console.log("All DOM elements captured");

// ===================================
// STATE VARIABLES
// ===================================

// State #1: Dark mode toggle (boolean)
let isDarkMode = false;

// State #2: Click counter (number)
let clickCount = 0;

// Console log #3: Initial state
console.log("Initial state - isDarkMode:", isDarkMode, "| clickCount:", clickCount);

// ===================================
// FUNCTIONS
// ===================================

// Function #1: Toggle theme
function setTheme() {
    isDarkMode = !isDarkMode; // Toggle the state

    if (isDarkMode) {
        document.body.classList.add("dark-theme");
        themeStatus.innerText = "Current theme: Dark";
        console.log("Dark mode activated");
    } else {
        document.body.classList.remove("dark-theme");
        themeStatus.innerText = "Current theme: Light";
        console.log("Light mode activated");
    }
}

// Function #2: Update counter display
function updateCounter() {
    clickCount = clickCount + 1;
    counterDisplay.innerHTML = `Button clicked: <strong>${clickCount}</strong> times`;

    // Console log for each click
    console.log("Button clicked! Total clicks:", clickCount);
}

// ===================================
// EVENT HANDLERS
// ===================================

// Event #1: Theme toggle button
btnTheme.onclick = function () {
    console.log("Theme toggle button clicked");
    setTheme();
};

// Event #2: Click counter button
btnCount.onclick = function () {
    updateCounter();
};

// ===================================
// INITIALIZATION
// ===================================

console.log("Script initialization complete");
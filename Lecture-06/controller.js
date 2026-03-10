let isDark = false;

function toggleTheme() {
    isDark = !isDark;
    
    if (isDark) {
        document.body.classList.add('dark');
        localStorage.setItem('portfolio_theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('portfolio_theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('portfolio_theme');
    
    if (savedTheme === 'dark') {
        isDark = true;
        document.body.classList.add('dark');
    } else {
        isDark = false;
        document.body.classList.remove('dark');
    }
}

function setLastUpdated() {
    const lastUpdatedElement = document.getElementById('last-updated');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    lastUpdatedElement.textContent = `Last updated: ${year}-${month}-${day}`;
}

document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    
    setLastUpdated();
    
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
});


// Why do we use async/await?
// async/await lets us write asynchronous code (like network requests) in a
// sequential, readable style. Instead of chaining .then() callbacks, we can
// use "await" to pause execution until a Promise resolves, making the logic
// easier to follow and maintain.

// Why do we check response.ok?
// fetch() only rejects its Promise on network failures (e.g., no internet).
// HTTP error status codes like 404 or 500 do NOT cause fetch to throw.
// Checking response.ok ensures we catch server-side errors and handle them
// explicitly rather than trying to parse an error page as valid JSON.

// Why do we use try/catch?
// try/catch lets us handle both network errors (fetch itself failing) and
// any errors we throw manually (e.g., when response.ok is false) in one
// place. This gives us a single, clean error-handling path so the user
// always sees a friendly message instead of the app silently breaking.

async function loadUserData() {
    const output = document.getElementById('data-output');
    const button = document.getElementById('load-data-btn');

    // Show loading state and disable button to prevent duplicate requests
    output.innerHTML = '<p class="loading-message">Loading…</p>';
    button.disabled = true;

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

        // Check if the server returned a successful status code
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const user = await response.json();

        // Dynamically build and insert the user card into the DOM
        const card = document.createElement('div');
        card.className = 'user-card';

        const nameParagraph = document.createElement('p');
        nameParagraph.innerHTML = `<strong>Name:</strong> ${user.name}`;

        const emailParagraph = document.createElement('p');
        emailParagraph.innerHTML = `<strong>Email:</strong> ${user.email}`;

        const companyParagraph = document.createElement('p');
        companyParagraph.innerHTML = `<strong>Company:</strong> ${user.company.name}`;

        card.appendChild(nameParagraph);
        card.appendChild(emailParagraph);
        card.appendChild(companyParagraph);

        output.innerHTML = '';
        output.appendChild(card);

    } catch (error) {
        // Handle network failures and HTTP errors uniformly
        output.innerHTML = '<p class="error-message">Error loading data</p>';
        console.error('Fetch failed:', error);
    } finally {
        button.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loadDataBtn = document.getElementById('load-data-btn');
    if (loadDataBtn) {
        loadDataBtn.addEventListener('click', loadUserData);
    }
});
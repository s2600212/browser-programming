let isDark = localStorage.getItem("portfolio_theme") === "dark";

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

function setLastUpdated() {
    const lastUpdatedElement = document.getElementById('last-updated');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    lastUpdatedElement.textContent = `Last updated: ${year}-${month}-${day}`;
}

document.addEventListener('DOMContentLoaded', function () {
    loadTheme();

    setLastUpdated();

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
});

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
    // Restore scroll position
    const savedPosition = sessionStorage.getItem("portfolio_scroll");
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem("portfolio_scroll");
    }
    // Save scroll position when navigating to a project
    document.querySelectorAll("a[href*='pages/']").forEach(function (link) {
        link.addEventListener("click", function () {
            sessionStorage.setItem("portfolio_scroll", window.scrollY);
        });
    });
    const loadDataBtn = document.getElementById('load-data-btn');
    if (loadDataBtn) {
        loadDataBtn.addEventListener('click', loadUserData);
    }
    document.querySelector('.copy-email-btn').addEventListener('click', async (e) => {
        const btn = e.currentTarget;
        const email = btn.dataset.email;
        const original = btn.textContent;

        try {
            await navigator.clipboard.writeText(email);
            btn.textContent = '✅';
            btn.setAttribute('aria-label', 'Copied!');
        } catch {
            btn.textContent = '❌';
            btn.setAttribute('aria-label', 'Failed to copy');
        }

        setTimeout(() => {
            btn.textContent = original;
            btn.setAttribute('aria-label', 'Copy email address to clipboard');
        }, 2000);
    });
});
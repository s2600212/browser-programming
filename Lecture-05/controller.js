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

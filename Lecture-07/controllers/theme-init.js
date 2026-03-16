document.documentElement.style.visibility = "hidden";
document.documentElement.classList.add("no-transition");

if (localStorage.getItem("portfolio_theme") === "dark") {
    document.documentElement.classList.add("dark");
}

window.addEventListener("load", function () {
    document.documentElement.style.visibility = "";
    requestAnimationFrame(function () {
        document.documentElement.classList.remove("no-transition");
    });
});
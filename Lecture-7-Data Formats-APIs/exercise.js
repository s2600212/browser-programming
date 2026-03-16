const output = document.getElementById("output")
const list = document.getElementById("userList")

function log(text) {
    output.textContent += text + "\n"
}

function clearOutput() {
    output.textContent = ""
    list.innerHTML = ""
}

document.getElementById("btnLoadUsers").onclick = loadUsers

async function loadUsers() {

    clearOutput()

    try {

        // Part A — Fetch data from the API
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        )

        // Part C — Check HTTP status before proceeding
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status)
        }

        const users = await response.json()

        // Part A checkpoint — see what data looks like in console
        console.log(users)

        // Part B — Loop through users and print info
        users.forEach(function (user) {

            const name = user.name
            const email = user.email
            const city = user.address.city

            // Print to the <pre> output area
            log(name + " - " + email + " - " + city)

            // Part E — Also display as list items in the webpage
            const li = document.createElement("li")
            li.textContent = name + " - " + email + " - " + city
            list.appendChild(li)

        })

    } catch (error) {

        // Part C — Catch network errors or thrown HTTP errors
        log("Error: " + error.message)

    }

}
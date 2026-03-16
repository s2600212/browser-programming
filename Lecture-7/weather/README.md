# Why is this page called dynamic?
The page content changes after it loads based on data fetched from an external server. The HTML is not static — the temperature, wind speed, city name, and even the background color all update in response to user actions and live API data. Each time you click a button, you see different real-time information.

# What does the API give us?
The Open-Meteo API gives us structured weather data for a specific geographic location. It returns current measurements like temperature and wind speed in a machine-readable JSON format. This means our JavaScript code can reliably extract the values it needs without parsing messy text.

# Why is JSON useful here?
JSON maps directly to JavaScript objects, so the browser can convert the response into nested objects and arrays with a single .json() call. This makes it easy to access deeply nested values like data.current.temperature_2m using dot notation. It is lightweight, human-readable, and the standard data format for web APIs.

# Why is it better to create one reusable function for all cities?
A single loadWeatherByCity function with parameters means the fetch logic, error handling, and DOM updates exist in only one place. If we need to fix a bug or add a feature (like showing humidity), we change one function instead of three identical copies. This follows the DRY principle (Don't Repeat Yourself) and makes the code easier to maintain and extend to even more cities.
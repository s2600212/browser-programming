# What does fetch() return?

fetch() returns a Promise that resolves to a Response object. This Response object contains the HTTP status, headers, and the body of the response. We use await to pause execution until the Promise resolves so we can work with the actual Response.

# Why do we use response.json()?

The raw response body arrives as a stream of text. response.json() reads that text stream and parses it from JSON format into a JavaScript object (or array) that we can work with programmatically. It also returns a Promise, which is why we use await on it as well.

# Why must we check response.ok?

fetch() only rejects its Promise on network failures (like no internet connection). If the server responds with an error status code such as 404 or 500, fetch() still resolves successfully. Checking response.ok lets us detect these HTTP-level errors and handle them properly instead of trying to parse an error page as valid user data.
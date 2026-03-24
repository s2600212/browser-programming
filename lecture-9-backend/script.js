function getMessage() {
    const output = document.getElementById("output");
    const button = document.getElementById("messageBtn");

    output.innerHTML = '<span class="loading">⏳ Loading...</span>';
    button.disabled = true;

    fetch("http://localhost:3000/api/message")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const formattedTime = formatDate(data.time);

            output.innerHTML = `
        <div class="success">✅ Data received successfully!</div>
        <div class="info-item">
          <span class="label">Message:</span> ${data.message}
        </div>
        <div class="info-item">
          <span class="label">Course:</span> ${data.course}
        </div>
        <div class="info-item">
          <span class="label">Year:</span> ${data.year}
        </div>
        <div class="info-item">
          <span class="label">Time:</span> ${formattedTime}
        </div>
      `;
        })
        .catch(error => {
            console.error("Error:", error);
            output.innerHTML = `
        <div class="error">❌ Error: ${error.message}</div>
        <p>Make sure the server is running on port 3000!</p>
      `;
        })
        .finally(() => {
            button.disabled = false;
        });
}

function getStudent() {
    const output = document.getElementById("output");
    const button = document.getElementById("studentBtn");

    output.innerHTML = '<span class="loading">⏳ Loading student data...</span>';
    button.disabled = true;

    fetch("http://localhost:3000/api/student")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            output.innerHTML = `
        <div class="success">✅ Student data received!</div>
        <div class="info-item">
          <span class="label">Name:</span> ${data.name}
        </div>
        <div class="info-item">
          <span class="label">Role:</span> ${data.role}
        </div>
        <div class="info-item">
          <span class="label">University:</span> ${data.university}
        </div>
        <div class="info-item">
          <span class="label">Semester:</span> ${data.semester}
        </div>
      `;
        })
        .catch(error => {
            console.error("Error:", error);
            output.innerHTML = `
        <div class="error">❌ Error: ${error.message}</div>
        <p>Make sure the server is running on port 3000!</p>
      `;
        })
        .finally(() => {
            button.disabled = false;
        });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}
// Show loading spinner
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Display data in a user-friendly format
function displayData(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
        <p><strong>Address:</strong> ${data.address || 'N/A'}</p>
        <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
    `;
}

// Fetch data from backend
async function fetchData() {
    const query = document.getElementById('query').value;
    const resultDiv = document.getElementById('result');

    if (!query) {
        resultDiv.textContent = "Please enter a query.";
        return;
    }

    showLoading();
    resultDiv.textContent = "";

    try {
        // Fetch data from backend
        const response = await fetch(`http://localhost:3000/lookup?q=${query}`);
        const data = await response.json();

        if (data.error) {
            resultDiv.textContent = "Error: " + data.error;
        } else {
            displayData(data);
        }
    } catch (error) {
        resultDiv.textContent = "Error fetching data.";
        console.error(error);
    } finally {
        hideLoading();
    }
}

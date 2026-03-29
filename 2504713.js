const reader = new Html5Qrcode("camera");
let scannerOn = false;

const inventory = document.getElementById("inventory");

function toggleScanner() {
    scannerOn = !scannerOn;

    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {},
        function (text) {
            const data = JSON.parse(text);

            // Show marker on map
            showMarkerAt(data.top, data.left);

            // Create item container
            const itemDiv = document.createElement("div");

            // Create separate <p> tags (IMPORTANT for marks)
            const name = document.createElement("p");
            name.textContent = "Name: " + data.name;

            const stock = document.createElement("p");
            stock.textContent = "In Store: " + (data.in_store ? "Yes" : "No");

            const price = document.createElement("p");
            price.textContent = "Price: €" + data.price;

            // Append all
            itemDiv.appendChild(name);
            itemDiv.appendChild(stock);
            itemDiv.appendChild(price);

            inventory.appendChild(itemDiv);

            toggleScanner();
        }
    ).catch(function (err) {
        console.error(err);
    });
}

function stopScanner() {
    reader.stop();
}

function showMarkerAt(top, left) {
    marker.style.top = top;
    marker.style.left = left;
}

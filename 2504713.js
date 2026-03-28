const reader = new Html5Qrcode("camera");
let scannerOn = false;

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

    showMarkerAt(data.top, data.left);

    // SHOW INVENTORY DATA
    document.body.innerHTML += `
        <p>Name: ${data.name}</p>
        <p>In Store: ${data.in_store ? "Yes" : "No"}</p>
        <p>Price: €${data.price}</p>
    `;

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

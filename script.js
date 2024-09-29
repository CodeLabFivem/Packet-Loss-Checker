document.getElementById('pingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const serverIp = document.getElementById('serverIp').value;
    const pingResultDiv = document.getElementById('pingResult');
    pingResultDiv.innerHTML = 'Pinging...';

    fetch('http://localhost:3000/ping', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ip: serverIp })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            pingResultDiv.innerHTML = `Error: ${data.error}`;
        } else {
            pingResultDiv.innerHTML = `Packet Loss: ${data.packetLoss}%<br>Response Time: ${data.time} ms<br>Host: ${data.host}`;
        }
    })
    .catch(error => {
        pingResultDiv.innerHTML = `Error: ${error.message}`;
    });
});

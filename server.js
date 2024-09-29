const express = require('express');
const ping = require('ping');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ping', async (req, res) => {
    const { ip } = req.body;
    if (!ip) {
        return res.status(400).json({ error: 'IP address is required' });
    }

    try {
        const result = await ping.promise.probe(ip, { min_reply: 10 }); // ping 10 times
        res.json({
            packetLoss: result.packetLoss,
            time: result.time,
            host: result.host
        });
    } catch (error) {
        res.status(500).json({ error: 'Ping failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

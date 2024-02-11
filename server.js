const express = require('express');
const speakeasy = require('speakeasy');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/generate-otp', (req, res) => {
    const { secret, digits, period } = req.body;
    const token = speakeasy.totp({
        secret: secret,
        encoding: 'base32',
        digits: digits,
        step: period
    });

    const remaining = period - Math.floor((new Date().getTime() / 1000) % period);
    res.json({ token: token, remaining: remaining });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

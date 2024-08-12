require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 5500;
app.use(cors());

app.use(express.static('public'));
app.use(express.json());

app.post('/send', async (req, res) => {
    const secret_key = process.env.SECRETKEY;
    const token = req.body.token;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

    try {
        const response = await fetch(url, {
            method: 'POST'
        });
        const google_response = await response.json();
        res.json({ google_response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
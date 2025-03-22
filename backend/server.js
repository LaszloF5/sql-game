const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT  = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        throw err;
    }
    console.log('Connected to the SQLite database.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
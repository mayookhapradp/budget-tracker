const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create SQLite database and table
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS budget_entries (id INTEGER PRIMARY KEY, date TEXT, description TEXT, amount REAL)');
});

// Middleware to parse JSON in requests
app.use(bodyParser.json());

// API endpoint to get budget entries
app.get('/api/budget', (req, res) => {
    db.all('SELECT * FROM budget_entries', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

// API endpoint to add a budget entry
app.post('/api/budget', (req, res) => {
    const { date, description, amount } = req.body;

    if (!date || !description || isNaN(amount)) {
        res.status(400).json({ error: 'Invalid data' });
        return;
    }

    db.run('INSERT INTO budget_entries (date, description, amount) VALUES (?, ?, ?)', [date, description, amount], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

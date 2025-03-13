const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Luo tai avaa tietokanta
const db = new sqlite3.Database('tietokanta.db', (err) => {
    if (err) {
        console.error('Tietokannan avausvirhe:', err.message);
    } else {
        console.log('Tietokanta avattu onnistuneesti.');
    }
});

// Luo items-taulu, jos sitä ei ole vielä olemassa
db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
)`, (err) => {
    if (err) {
        console.error('Taulun luontivirhe:', err.message);
    } else {
        console.log('items-taulu luotu tai se on jo olemassa.');
    }
});

// CRUD-reitit

// 1. Lisää uusi tieto
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    db.run(`INSERT INTO items (name, description) VALUES (?, ?)`,
        [name, description], function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID, name, description });
            }
        });
});

// 2. Hae kaikki tiedot
app.get('/items', (req, res) => {
    db.all(`SELECT * FROM items`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// 3. Poista tieto ID:n perusteella
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM items WHERE id = ?`, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "Tieto poistettu", id });
        }
    });
});

// Oletusreitti (päivittää `localhost:3000` sivun)
app.get('/', (req, res) => {
    res.send('Tervetuloa API:in!');
});

// Käynnistä palvelin
app.listen(port, () => {
    console.log(`Palvelin käynnistyi portissa ${port}`);
});



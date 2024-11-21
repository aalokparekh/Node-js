const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { logger } = require('./middlewares/logger.middleware');
const { addID } = require('./middlewares/addID.middleware');
const { auth } = require('./middlewares/auth.middleware');

const app = express();
app.use(bodyParser.json());
app.use(logger);

// Load database
const getDatabase = () => JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

// Save database
const saveDatabase = (db) => fs.writeFileSync('./db.json', JSON.stringify(db, null, 2), 'utf-8');

// Add a new hero
app.post('/add/hero', addID, (req, res) => {
    try {
        const db = getDatabase();
        db.heroes.push(req.body);
        saveDatabase(db);
        res.status(200).json(db.heroes);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// Retrieve all heroes
app.get('/heroes', (req, res) => {
    try {
        const db = getDatabase();
        res.status(200).json(db.heroes);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// Update villains for a hero
app.patch('/update/villain/:hero_id', auth, (req, res) => {
    try {
        const heroId = parseInt(req.params.hero_id);
        const db = getDatabase();
        const hero = db.heroes.find((h) => h.id === heroId);

        if (!hero) {
            return res.status(404).json({ message: "Hero not found" });
        }

        hero.villains.push(req.body);
        saveDatabase(db);
        res.status(200).json(hero);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// Delete a hero
app.delete('/delete/hero/:hero_id', auth, (req, res) => {
    try {
        const heroId = parseInt(req.params.hero_id);
        const db = getDatabase();
        const heroIndex = db.heroes.findIndex((h) => h.id === heroId);

        if (heroIndex === -1) {
            return res.status(404).json({ message: "Hero not found" });
        }

        db.heroes.splice(heroIndex, 1);
        saveDatabase(db);
        res.status(200).json(db.heroes);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

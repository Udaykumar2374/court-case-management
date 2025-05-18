const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/hearings.json');

// Add a hearing
router.post('/', (req, res) => {
    const hearings = JSON.parse(fs.readFileSync(dataPath));
    const newHearing = { id: Date.now(), ...req.body };
    hearings.push(newHearing);
    fs.writeFileSync(dataPath, JSON.stringify(hearings, null, 2));
    res.json(newHearing);
});

// List all hearings
router.get('/', (req, res) => {
    const hearings = JSON.parse(fs.readFileSync(dataPath));
    res.json(hearings);
});

module.exports = router;

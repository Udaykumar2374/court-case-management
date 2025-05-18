const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/cases.json');

// Add a new case
router.post('/', (req, res) => {
    const cases = JSON.parse(fs.readFileSync(dataPath));
    const newCase = { id: Date.now(), ...req.body };
    cases.push(newCase);
    fs.writeFileSync(dataPath, JSON.stringify(cases, null, 2));
    res.json(newCase);
});

// List cases (with optional status filter)
router.get('/', (req, res) => {
    const cases = JSON.parse(fs.readFileSync(dataPath));
    const { status } = req.query;
    const filtered = status ? cases.filter(c => c.status === status) : cases;
    res.json(filtered);
});

module.exports = router;

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const caseRoutes = require('./routes/caseRoutes');
const hearingRoutes = require('./routes/hearingRoutes');

app.use('/cases', caseRoutes);
app.use('/hearings', hearingRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

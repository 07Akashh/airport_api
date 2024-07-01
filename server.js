const express = require('express');
const app = express();
const port = 3000;

const airportRoute = require('./routes/airport');

app.use(express.json()); 

app.use('/api/airport', airportRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

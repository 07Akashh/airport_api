const express = require('express');
const app = express();
require('dotenv').config();

const airportRoute = require('./routes/airport');

app.use(express.json()); 

app.use('/api/airport', airportRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

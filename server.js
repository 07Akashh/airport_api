const express = require('express');
const app = express();
require('dotenv').config();

const airportRoute = require('./routes/airport');
const { router: keepAliveRouter, keepAlive } = require('./routes/keepAlive');
const errorHandlingMiddleware = require('./middleware/errorHandling');

app.use(express.json());

app.use('/api/airport', airportRoute);
app.use('/', keepAliveRouter);

app.use(errorHandlingMiddleware);

setInterval(keepAlive, 2 * 1000);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

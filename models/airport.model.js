const pool = require('../db');

class Airport {
    static async findByIATACode(iataCode) {
        try {
            const airportResult = await pool.query(
                `SELECT * FROM Airport WHERE iata_code = $1`,
                [iataCode]
            );

            return airportResult.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Airport;

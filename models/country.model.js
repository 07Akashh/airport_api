const pool = require('../db');

class Country {
    static async findById(countryId) {
        try {
            const countryResult = await pool.query(
                `SELECT * FROM Country WHERE id = $1`,
                [countryId]
            );

            return countryResult.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Country;

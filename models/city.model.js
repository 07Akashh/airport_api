const pool = require('../db');

class City {
    static async findById(cityId) {
        try {
            const cityResult = await pool.query(
                `SELECT * FROM City WHERE id = $1`,
                [cityId]
            );

            return cityResult.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = City;

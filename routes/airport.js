const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res, next) => {
    const iataCode = req.query.iata_code;

    if (!iataCode) {
        return res.status(400).json({ error: 'iata_code is required' });
    }

    try {
        const airportResult = await pool.query(
            `SELECT * FROM Airport WHERE iata_code = $1`,
            [iataCode]
        );

        if (airportResult.rows.length === 0) {
            return res.status(404).json({ error: 'Airport not found' });
        }

        const airport = airportResult.rows[0];

        let city = {};
        let country = {};

        if (airport.city_id) {
            const cityResult = await pool.query(
                `SELECT * FROM City WHERE id = $1`,
                [airport.city_id]
            );

            if (cityResult.rows.length > 0) {
                city = {
                    id: cityResult.rows[0].id,
                    name: cityResult.rows[0].name,
                    country_id: cityResult.rows[0].country_id,
                    is_active: cityResult.rows[0].is_active,
                    lat: cityResult.rows[0].lat,
                    long: cityResult.rows[0].long,
                };
            } else {
                city = { id: airport.city_id, name: 'City not available', country_id: null };
            }
        } else {
            city = { id: null, name: 'City not available', country_id: null };
        }

        if (city.country_id) {
            const countryResult = await pool.query(
                `SELECT * FROM Country WHERE id = $1`,
                [city.country_id]
            );

            if (countryResult.rows.length > 0) {
                country = {
                    id: countryResult.rows[0].id,
                    name: countryResult.rows[0].name,
                    country_code_two: countryResult.rows[0].country_code_two,
                    country_code_three: countryResult.rows[0].country_code_three,
                    mobile_code: countryResult.rows[0].mobile_code,
                    continent_id: countryResult.rows[0].continent_id,
                };
            } else {
                country = { id: city.country_id, name: 'Country not available' };
            }
        } else {
            country = { id: null, name: 'Country not available' };
        }

        const response = {
            airport: {
                id: airport.id,
                icao_code: airport.icao_code,
                iata_code: airport.iata_code,
                name: airport.name,
                type: airport.type,
                latitude_deg: airport.latitude_deg,
                longitude_deg: airport.longitude_deg,
                elevation_ft: airport.elevation_ft,
                address: {
                    city: city,
                    country: country
                }
            }
        };

        res.json(response);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

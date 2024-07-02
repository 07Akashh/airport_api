const express = require('express');
const router = express.Router();
const Airport = require('../models/airport.model');
const City = require('../models/city.model');
const Country = require('../models/country.model');

router.get('/', async (req, res, next) => {
    const iataCode = req.query.iata_code;

    if (!iataCode) {
        return res.status(400).json({ error: 'iata_code is required' });
    }

    try {
        const airport = await Airport.findByIATACode(iataCode);

        if (!airport) {
            return res.status(404).json({ error: 'Airport not found' });
        }

        let city = {};
        let country = {};

        if (airport.city_id) {
            city = await City.findById(airport.city_id);
            if (!city) {
                city = { id: airport.city_id, name: 'City not available', country_id: null };
            }
        } else {
            city = { id: null, name: 'City not available', country_id: null };
        }

        if (city.country_id) {
            country = await Country.findById(city.country_id);
            if (!country) {
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

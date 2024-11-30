import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getMinMaxValues } from './util.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use import.meta.url to get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the local JSON file
const dataPath = path.join(__dirname, 'data', 'taxi-trips.json');

// Load the data from the JSON file
const tripsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Middleware
app.use(express.json());

// API route to fetch trip data with optional filtering
/* Alternative option is to use service from Socrata but there'll be slight delay because the data is transfered through network.
   Other viable option is by using database, export csv from the dataset and create a database using that csv. */

app.get('/api/trips', (req, res) => {
    const { time, fareMin, fareMax, distanceMin, distanceMax, paymentType } = req.query;
    console.log(req.query)
    let filteredTrips = tripsData;

    // Mandatory Filters
    if (time) {
        filteredTrips = filteredTrips.filter((trip) => {
            const tripHour = trip.pickup_datetime.split('T')[1].split(':')[0]; // Extract hour from pickup_datetime
            const filterHour = time.split(':')[0]; // Extract hour from time filter
            return tripHour === filterHour;
        });
    }
    if (fareMin) {
        filteredTrips = filteredTrips.filter((trip) => parseFloat(trip.fare_amount) >= parseFloat(fareMin));
    }
    if (fareMax) {
        filteredTrips = filteredTrips.filter((trip) => parseFloat(trip.fare_amount) <= parseFloat(fareMax));
    }
    if (distanceMin) {
        filteredTrips = filteredTrips.filter((trip) => parseFloat(trip.trip_distance) >= parseFloat(distanceMin));
    }
    if (distanceMax) {
        filteredTrips = filteredTrips.filter((trip) => parseFloat(trip.trip_distance) <= parseFloat(distanceMax));
    }
    if (paymentType) {
        filteredTrips = filteredTrips.filter((trip) => trip.payment_type.toLowerCase() === paymentType.toLowerCase());
    }

    // Return the filtered trips as a JSON response
    res.json(filteredTrips);
    // const minmax = getMinMaxValues(filteredTrips)
    // console.log(minmax)
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');
const path = require('path');

// Import database connection
const dbConnection = require('./db');
dbConnection();
// Use JSON middleware for handling JSON requests
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// API routes
app.use('/api/cars/', require('./routes/carsRoute'));
app.use('/api/users/', require('./routes/usersRoute'));
app.use('/api/bookings/', require('./routes/bookingsRoute'));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Serve the index.html file for any unmatched routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    // For development, serve a basic response on the root route
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Node JS Server started on port ${port}`);
});

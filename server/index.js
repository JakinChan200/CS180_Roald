// importing the express module
const express = require('express');
// importing the /api routes router
const api = require('./routes/api.js');

// defining the port our application will run on
const port = process.env.PORT || 8000;

// standard definition of express app
const app = express();
// defining route handling for / and /api
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', api);

// starting the application on the given port
app.listen(port, () => console.log(`Server running on port ${port}`));
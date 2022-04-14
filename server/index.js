// importing the express module
const express = require('express');
// importing the /api routes router
const api = require('./routes/api.js');

// importing functions on start
const db = require('./database/database');

// defining the port our application will run on
const port = process.env.PORT || 8000;

// standard definition of express app
const app = express();

// add cors for frontend url
var cors = require('cors')
app.use(cors({
    origin: ['http://localhost:3000']
}));

// defining route handling for / and /api
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', api);

// starting the application on the given port
app.listen(port, () => console.log(`Server running on port ${port}`));


// load CA and DE csv on start
db.getData(['CA', 'DE']);
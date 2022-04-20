// importing the express module
const express = require('express');
// importing the /api routes router
const api = require('./routes/api.js');
const countries = require('./routes/countries.js');
const videos = require('./routes/videos.js');

// defining the port our application will run on
const port = process.env.PORT || 8000;

// standard definition of express app
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// add cors for frontend url
var cors = require('cors')
app.use(cors({
    origin: ['http://localhost:3000']
}));

// defining route handling for / and /api
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', api);

// countries is a collection on the api
app.use('/api/countries', countries);

// videos is a collection of user-submitted videos
app.use('/api/videos', videos);

// starting the application on the given port
app.listen(port, () => console.log(`Server running on port ${port}`));

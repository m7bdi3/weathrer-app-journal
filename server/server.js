// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { request } = require('http');
const path = require('path');

//Add port 

const port = 3000;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static(path.join(__dirname, '..', 'website')));


// Setup Server

app.listen(port, () => {
    console.log(`server runnig on port ${port}`)
});


// GET 

app.get('/getData', (request, response) => {
    response.send(projectData);
});


//POST

app.post('/postData', (request, response) => {
    projectData = {
        temp: request.body.temp,
        date: request.body.dateNow,
        content: request.body.content,
        city: request.body.city,
        description: request.body.description
    };
    response.send(projectData);
});



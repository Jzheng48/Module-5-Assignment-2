//set environment variables
const dotenv = require ('dotenv'); // must be the first two lines of code
dotenv.config ({path: './config.env'});

// Template for Node. js Express server
const express = require('express');
//create express app
const app = express();

//body-parser is a middleware that parses incoming requests with JSON payloads and is based on body-parser.

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
const path = require('path');

//path module provides utilities for working with file and directory paths

// Debugging and logging
const morgan = require('morgan-body');

// Create a rotating write stream
const rfs = require('rotating-file-stream');
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log'),
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Setup the logger
morgan(app, {
  stream: accessLogStream,
  noColors: true,
  logReqUserAgent: true,
  logRequestBody: true,
  logResponseBody: true,
  logReqCookies: true,
  logReqSignedCookies: true,
});




//_dirname is the directory name of the current module
app.use(express.static(path.join(__dirname, 'public')));

//set the view engine to ejs

app.set('view engine','ejs');

//set the views directory
app.set ('views','views');

//routes defined in routes folder
const userRoute=require('./routes/userRoute')
app.use('/user', userRoute)

//404 page Error page
app.use((err, reg, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found'});
});

//Connecting to the database
const mongoose = require ('mongoose');

//asyncronous connection
mongoose.connect('mongodb+srv://jiaweizheng:88888888@cluster0.buoixrx.mongodb.net/demodb',{useNewUrlParser:true})
    .then(() => console.log('MondoDe connection successful'))
    .catch((err) => console.error(err));

//start the server
const port = process.env.PORT;

app.listen(port, () => {
console.log(`App running on port ${port}... `);
});

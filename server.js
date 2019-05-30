const express = require('express');

const app = express();

// GET Request returns "Hello, World"
app.use(express.json());

// server.js, any file with a created and configured Express app
app.use(express.static("./public"));

// Use "Avengers route"
const avengers = require('./avengers');
app.use('/avengers', avengers);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port: http://localhost:${port}`));
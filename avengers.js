const express = require('express');

const avengers = express.Router();

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'avengers',
  password: 'password',
  port: 5432,
});

/**
 * GET all avengers from database
 */
avengers.get('/', (req,res) => {

    if ( req.query.type ) {
        pool.query(
            "SELECT * FROM heroes WHERE type_id = $1::int;", 
            [req.query.type])
        .then((result) => {
            res.send(result.rows);
        });  
    } else {
        pool.query("SELECT * FROM heroes").then((result) => {
            res.send(result.rows);
        });
    }


});

/**
 * Get a specific avenger
 */
avengers.get('/:id', (req,res) => {
    // Getting the ID from the URL and setting it
    // to the array
    let index = req.params.id; 
    let query = req.query;

    res.send('Not Done Yet!!!');

});

/**
 * GET all avengers from database
 */
avengers.get('/types', (req,res) => {
    res.send('Not Done Yet!!!');
});

/**
 * GET all avengers from database
 */
avengers.get('/types/:id', (req,res) => {
    // Getting the ID from the URL and setting it
    // to the array
    let index = req.params.id; 
    res.send('Not Done Yet!!!');
});

/**
 * Add new avenger to database
 */
avengers.post('/', (req,res) => {
    res.send('Not Done Yet!!!');
});

/**
 * Add new type to database
 */
avengers.post('/types', (req,res) => {
    let body = req.body; 

    res.send('Not Done Yet!!!');
});

/**
 * Add new type to database
 */
avengers.put('/:id', (req,res) => {
    let index = req.params.id; 
    let body = req.body; 


    res.send('Not Done Yet!!!');
});

/**
 * Add new type to database
 */
avengers.put('/types/:id', (req,res) => {
    let index = req.params.id;
    let body = req.body;

    res.send('Not Done Yet!!!');
});

avengers.delete('/:id', (req,res) => {
    let index = req.params.id;
});

avengers.delete('/types/:id', (req,res) => {
    let index = req.params.id;
});

module.exports = avengers;

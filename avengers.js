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
    let whereClause = 'WHERE 1=1';

    let values = [];

    if ( req.query.type ) {
        values.push(req.query.type);

        whereClause += ` AND type_id = $${values.length}::int`;
    } 
    
    if (req.query.power) {
        values.push(req.query.power);

        whereClause += ` AND power = $${values.length}::int`;    
    } else {
        if ( req.query.powerGreaterThan ) {
            values.push(req.query.powerGreaterThan);

            whereClause += ` AND power > $${values.length}::int`;   
        }

        if ( req.query.powerLessThan ) {
            values.push(req.query.powerLessThan);

            whereClause += ` AND power < $${values.length}::int`; 
        }
    } 

    pool.query(
        "SELECT * FROM heroes" + " " + whereClause,
       (values.length ? values : null)
    ).then((result) => {
        res.send(result.rows);
    });
});

/**
 * Get a specific avenger
 */
avengers.get('/:id', (req,res) => {
    // Getting the ID from the URL and setting it
    // to the array
    let index = req.params.id; 

    pool.query(
        "SELECT * FROM heroes WHERE id = $1::int",
       [index]
    ).then((result) => {
        res.send(result.rows);
    });

});

/**
 * GET all avengers from database
 */
avengers.get('/types', (req,res) => {
    // Getting the ID from the URL and setting it
    // to the array
    console.log("GETTING TYPES");
    res.send('done');
    // pool.query(
    //     "SELECT * FROM types",
    // ).then((result) => {
    //     res.send(result.rows);
    // });
});

/**
 * GET all avengers from database
 */
avengers.get('/types/:id', (req,res) => {
    // Getting the ID from the URL and setting it
    // to the array
    let index = req.params.id; 

    pool.query(
        "SELECT * FROM types WHERE id = $1::int",
       [index]
    ).then((result) => {
        res.send(result.rows);
    });
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

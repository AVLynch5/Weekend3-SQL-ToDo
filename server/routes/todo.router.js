const express = require('express');
const router = express.Router();

//input pool
const pool = require('../modules/pool');

//GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo" ORDER BY "id" LIMIT 50;';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error during GET', error);
        res.sendStatus(500);
    });
});

//POST

//PUT

//DELETE

module.exports = router;
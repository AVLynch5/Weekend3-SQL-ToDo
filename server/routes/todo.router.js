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
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Adding task', newTask);
    let queryText = `INSERT INTO "todo" ("task")
    VALUES ($1);`;
    pool.query(queryText, [newTask.task]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in POST', error);
        res.sendStatus(500);
    });
});

//PUT

//DELETE

module.exports = router;
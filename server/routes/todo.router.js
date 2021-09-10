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
router.put('/:id', (req, res) => {
    console.log(req.params.checked);
    const taskId = req.params.id;
    let queryText = `UPDATE "todo" SET "checked" = 'TRUE' WHERE "id" = $1;`;
    //switch (req.params.checked) {
        //case true:
            //queryText = `UPDATE "todo" SET "checked" = 'FALSE' WHERE "id" = $1;`;
            //break;
        //case false:
            //queryText = `UPDATE "todo" SET "checked" = 'TRUE' WHERE "id" = $1;`;
            //break; 
    //}
    pool.query(queryText, [taskId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in /todo PUT', error);
        res.sendStatus(500);
    });
});

//DELETE

module.exports = router;
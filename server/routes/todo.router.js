//import express and declare router
const express = require('express');
const router = express.Router();

//input pool
const pool = require('../modules/pool');

//GET
router.get('/', (req, res) => {
    //select all items from todo table ordered first to last by id
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
    //req.body = object from POST function
    let newTask = req.body;
    //console.log('Adding task', newTask);//test
    //insert new task object into the DB
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
//route params - named route URL used to capture id value
router.put('/:id', (req, res) => {
    //console.log(req.body.checked);//test
    //instead of using id info captured by route params, use id/boolean info sent in req.body
    const taskId = req.body.id;
    let queryText;
    //switch to determine queryText value - if bool true (checked), update to false. If bool false (not checked), update to true.
    //idea - use one PUT to toggle checked/not checked
    switch (req.body.checked) {
        case 'true':
            queryText = `UPDATE "todo" SET "checked" = 'FALSE' WHERE "id" = $1;`;
            break;
        case 'false':
            queryText = `UPDATE "todo" SET "checked" = 'TRUE' WHERE "id" = $1;`;
            break; 
    }
    pool.query(queryText, [taskId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in /todo PUT', error);
        res.sendStatus(500);
    });
});

//DELETE
router.delete('/:id', (req, res) => {
    //console.log(req.params);//test
    const taskId = req.params.id;
    let queryText = `DELETE FROM "todo" WHERE "id" = $1;`;
    pool.query(queryText, [taskId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in /todo DELETE', error);
        res.sendStatus(500);
    });
});

module.exports = router;

//From expressjs.com
//Route parameters
//Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.


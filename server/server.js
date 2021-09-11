//set up server static files
const express = require('express');
const app = express();
//router here
const todoRouter = require('./routes/todo.router.js');//router here

app.use(express.urlencoded({extended: true}));

app.use('/todo', todoRouter);

//serve back static files by default
app.use(express.static('server/public'))

// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
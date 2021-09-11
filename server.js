const express = require('express');
const bodyParser = require('body-parser');// create express app
const mongoose = require('mongoose');

const DB = 'mongodb+srv://alok:aloksinha@cluster0.91mxg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(DB).then(()=>{


console.log("Connection success mongoose");

}).catch((error)=>console.log("Error in connection not stable.",error))
const app = express();// Setup server port
const port = process.env.PORT || 4000;// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))// parse requests of content-type - application/json
app.use(bodyParser.json())// Configuring the database
const dbConfig = require('./config/db.config.js');
// const mongoose = require('mongoose');
mongoose.Promise = global.Promise;// Connecting to the database
mongoose.connect(DB, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});// define a root/default route
app.get('/', (req, res) => { res.json({ "message": "Hello Second Alok World" }); });// listen for requests
// Require Users routes
const userRoutes = require('./src/routes/user.routes');
// using as middleware
app.use('/api/users', userRoutes)
app.listen(port, () => { console.log(`Node server is listening on port ${port}`); });
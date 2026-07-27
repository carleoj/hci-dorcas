require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 
const appRoutes = require('./routes/appRoutes'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use('/api', userRoutes);
app.use('/api', appRoutes);

const PORT = process.env.PORT;

console.log(`Server Running`);

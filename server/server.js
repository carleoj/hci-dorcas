const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 
const appRoutes = require('./routes/appRoutes'); 


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', appRoutes);


const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
});

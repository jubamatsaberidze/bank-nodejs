require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const colors = require('colors');
const { PORT } = process.env;
const app = express();
//Connection to Database
connectDB();

app.use(express.json());
app.use(cors());

const routes = require('./routes')
routes(app);

app.listen(PORT, () => console.log(`Server started listening on port ${PORT}...`))


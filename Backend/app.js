const express = require('express');
const cors = require('cors')
require('dotenv').config();

const path = require('path');
const fs = require('fs');
const morgan = require('morgan');


const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();

// Parse le body des requêtes en json
app.use(express.json());
app.use(                
  express.urlencoded({
    extended: true,
  })
);   

//connection à la base de données
require('./database/connection');

// Configuration cors
const corsOptions = {
  origin: process.env.CLIENT_PORT,
  credentials: true,
  optionSuccessStatus:200,
  'allowedHeaders': ['token','uuid','admin', 'Content-Type'],
  'exposedHeaders': ['token','uuid','admin'],
  'methods': 'GET,POST,HEAD,PUT,PATCH,DELETE',
  'preflightContinue': false
}

app.use(cors(corsOptions))

// Log toutes les requêtes passées au serveur
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


//Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


module.exports = app;
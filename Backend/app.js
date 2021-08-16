const express = require('express');
const cors = require('cors')
require('dotenv').config();

const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const helmet = require('helmet');

const Cookies = require('cookies');
const cookieParser = require('cookie-parser');
const cryptojs = require('crypto-js');

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

app.use(cookieParser())

//connection à la base de données
require('./database/connection');

// Configuration cors
const corsOptions = {
  origin: process.env.CLIENT_PORT,
  Credentials: false,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,POST,HEAD,PUT,PATCH,DELETE',
  'preflightContinue': false
}

app.use(cors(corsOptions))
/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_PORT);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
*/

// Sécurisation des headers
app.use(helmet());
// Log toutes les requêtes passées au serveur
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


//Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;
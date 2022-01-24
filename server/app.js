const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
const session = require('express-session');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connexion à la base de données
mongoose.connect(process.env.MONGODB_PATH,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(error => handleError(error));
  mongoose.connection.on('error', err => {
    logError(err);
  });

// Lancement de Express
const app = express();

/**
 * MIDDLEWARES
 */
// Configuration cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.AUTHORIZED_ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// Parse le body des requetes en json
app.use(bodyParser.json());
// Log toutes les requêtes passées au serveur (sécurité)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
// Sécurise les headers
app.use(helmet());
// // Utilisation de la session pour stocker de manière persistante le JWT coté front
const sessionConfig = {
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie : {
    sameSite: 'strict',
    maxAge: 600 // 10 minute
  }
};

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionConfig));
/**
 * ROUTES
 */
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;
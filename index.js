
const {hashedSecret} = require('./config/crypto');
const express = require('express');
const session = require('express-session');
const app = express();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const { dbConnection } = require('./config/db');


require('dotenv').config();

app.set('trust proxy', 1);
app.use(session({
    secret: hashedSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

dbConnection();

// Configuración body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//IMPORTANTE!! NO PONER ESTA LINEA ANTES DEL BODYPARSER
app.use('/', productRoutes);
app.use('/', authRoutes);

//Configuración archivos en public
app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}/products
`));

module.exports = app;
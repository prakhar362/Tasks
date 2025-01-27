"use strict";
const { Sequelize } = require('sequelize');
// Database connection configuration
const sequelize = new Sequelize('prakhar', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Disable logging if you don't want to see SQL queries in console
});
// Authenticate the connection
sequelize.authenticate()
    .then(() => {
    console.log('Database connected successfully to discover');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});

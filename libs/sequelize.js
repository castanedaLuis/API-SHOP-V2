const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, { dialect: 'postgres', logging: console.log }); // Se crea una instancia de Sequelize, ya gestiona el pooling.

//le mandamos la conexion a nuestra función
setupModels(sequelize);
//le decimos a sequelize que haga una sincronización 
// ahora lo hacemos con migraciones ya no con sync
//sequelize.sync();

module.exports = sequelize;
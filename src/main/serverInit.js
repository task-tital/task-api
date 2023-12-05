const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const routes = require('../routes/server');
const { Sequelize } = require('sequelize');

dotenv.config();

const API_PORT = process.env.SERVER_PORT || 4000;
const SEQUELIZE_HTTP = 'postgres://citizix_user:S3cret@localhost:5432/prueba';

const server = Hapi.server({
    port : API_PORT,
    host : 'localhost'
});

async function init() {
    await server.start();
    server.route(routes);
    console.log(API_PORT);
}

module.exports = { server, init };
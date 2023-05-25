// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('./sockets');
const { dbConnection } = require('../database/config');

/**
 * Clase del servidor
 */
class Server {

    /**
     * Constructor de la clase Server
     */
    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Conectar a DB
        dbConnection();

        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    /**
     * Configura los middlewares del servidor
     */
    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // CORS
        this.app.use( cors() );

        
        // Parseo del body
        this.app.use( express.json() );

        // API End Points
        this.app.use( '/api/login', require('../router/auth') );
        this.app.use( '/api/mensajes', require('../router/mensajes') );
    }

    /**
     * Configura los sockets del servidor
     */
    configurarSockets() {
        new Sockets( this.io );
    }

    /**
     * Ejecuta el servidor
     */
    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;

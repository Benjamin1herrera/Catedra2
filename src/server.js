const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

class Server {
    constructor () {
        this.app = express();
        this.port = 8080;
        this.server = require('http').createServer(this.app);

        // Camino
        this.paths = {
        users: "/api/users",
        };

        // Conexión a la base de datos
        this.dbConnection();

        // Json
        this.app.use(express.json());

        // Middlewares
        this.middlewares();

        // Aplicacion de rutas
        this.routes();
    }

    async dbConnection() {
    }

    middlewares() {
        
        // Morgan
        this.app.use(morgan('dev'));
        
        // Leer y analisar el body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    routes() {

        // Caminos de ruta
        this.app.use(this.paths.users, require('./routes/userRouter'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;
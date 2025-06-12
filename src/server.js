const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./config/database');
const Usuarios = require('./models/Usuarios');

class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
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
        await db.authenticate()
        await Usuarios.sync({force: false});
        console.log('Base de datos conectada correctamente');
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
            console.log(`Servidor corriendo en el puerto: http://localhost:${this.port}, ${process.env.DB_NAME}`);
        });
    }
}

module.exports = Server;
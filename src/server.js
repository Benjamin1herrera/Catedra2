const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

class Server {
    constructor () {
        this.app = express();
        this.port = 8080;
        this.server = require('http').createServer(this.app);
    }
}
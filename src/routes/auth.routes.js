const {Router} = require('express');

const {registro, iniciarSesion, verInformacion} = require('../controllers/auth.controller');

const validateJWT = require('../middlewares/validateJWT');

const router = Router();

router.post('/login', iniciarSesion);

router.post('/register', registro);

router.get('/me', validateJWT, verInformacion);

module.exports = router;
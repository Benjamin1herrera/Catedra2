const {Router} = require('express');

const {registro, iniciarSesion} = require('../controllers/auth.controller');

const router = Router();

router.post('/login', iniciarSesion);

router.post('/register', registro);

//router.get('/verify-token', verifyToken);

module.exports = router;
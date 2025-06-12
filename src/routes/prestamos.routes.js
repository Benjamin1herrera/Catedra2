const {Router} = require('express');
const {registrarPrestamos} = require('../controllers/prestamo.controller');
const validateJWT = require('../middlewares/validateJWT');

const router = Router();

router.post('/loan',validateJWT,registrarPrestamos);

module.exports = router;
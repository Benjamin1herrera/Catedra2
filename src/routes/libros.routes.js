const {Router} = require('express');
const {agregarLibro, listarLibros, obtenerLibroporId} = require('../controllers/libro.controller');

const router = Router();

router.post('/add/book', agregarLibro);
router.get('/books', listarLibros);
router.get('/book/:id', obtenerLibroporId);


module.exports = router;
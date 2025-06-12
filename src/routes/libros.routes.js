const {Router} = require('express');
const {agregarLibro, listarLibros, obtenerLibroporId, editarLibro, eliminarLibro, reintegrarLibro} = require('../controllers/libro.controller');

const router = Router();

router.post('/add/book', agregarLibro);
router.get('/books', listarLibros);
router.get('/book/:id', obtenerLibroporId);
router.put('/book/:id', editarLibro);
router.delete('/book/:id', eliminarLibro);
router.put('/restore/book/:id', reintegrarLibro);

module.exports = router;
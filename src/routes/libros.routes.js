const {Router} = require('express');
const {agregarLibro, listarLibros, obtenerLibroporId, editarLibro, eliminarLibro} = require('../controllers/libro.controller');

const router = Router();

router.post('/add/book', agregarLibro);
router.get('/books', listarLibros);
router.get('/book/:id', obtenerLibroporId);
router.put('/book/:id', editarLibro);
router.delete('/book/:id', eliminarLibro);

module.exports = router;
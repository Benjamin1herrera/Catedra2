const {Router} = require('express');
const {agregarLibro, listarLibros} = require('../controllers/libro.controller');

const router = Router();

router.post('/add/book', agregarLibro);
router.get('/books', listarLibros);

module.exports = router;
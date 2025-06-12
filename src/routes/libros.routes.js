const {Router} = require('express');
const {agregarLibro} = require('../controllers/libro.controller');

const router = Router();

router.post('/add/book', agregarLibro);

module.exports = router;
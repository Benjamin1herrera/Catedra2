const {Router} = require('express');

const {register} = require('../controllers/auth.controller');

const router = Router();

//router.post('/login', login);

router.post('/register', register);

//router.get('/verify-token', verifyToken);

module.exports = router;
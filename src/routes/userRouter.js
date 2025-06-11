const { Router, response, request } = require('express');

const router = Router();

router.get('/', (req = request, res = response) => {
    res.status(200).json({
        menssage: 'Hola mundo'
    });
});

module.exports = router;
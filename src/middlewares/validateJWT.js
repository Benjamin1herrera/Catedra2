const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');

const validateJWT = async (req, res = response, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            error: true,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const usuarios = await Usuarios.findByPk(id);

        req.usuarios = usuarios;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: true,
                msg: 'Token expirado'
            });
        }

        return res.status(401).json({
            success: false,
            error: true,
            msg: 'Token no válido'
        });
    }
};

module.exports = validateJWT;

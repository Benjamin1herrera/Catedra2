const { response, request } = require('express');
const Usuarios = require('../models/Usuarios');
const Libros = require('../models/Libros');
const Prestamos = require('../models/Prestamos');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/generateJWT');
const jwt = require('jsonwebtoken');

const register = async (req = request, res = response) => {
    try {
        const { nombre, apellido, email, contrasenia } = req.body;
        
        const existingUser = await Usuarios.findOne({ where: { email } });

        if (existingUser){
            return res.status(409).json({
                success: false,
                error: true,
                msg: 'El usuario ya existe'
            });
        }

        const dataUsuario = {nombre, apellido, email, contrasenia};

        const usuarios = new Usuarios(dataUsuario);

        const salt = bcrypt.genSaltSync(10);
        usuarios.contrasenia = bcrypt.hashSync(usuarios.contrasenia, salt);

        await usuarios.save();

        const token = await generateJWT(usuarios.id);

        const datosUsuarios = {
            id: usuarios.id,
            nombre: usuarios.nombre,
            apellido: usuarios.apellido,
            email: usuarios.email,
            contrasenia: usuarios.contrasenia,
            token
        };

        return res.status(201).json({
            success: true,
            error: false,
            msg: 'Usuario registrado correctamente',
            usuarios: datosUsuarios
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            msg: 'Error del servidor'
        });
    }
}

module.exports = {register}
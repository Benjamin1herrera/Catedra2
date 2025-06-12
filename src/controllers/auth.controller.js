const { response, request } = require('express');
const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/generateJWT');
const jwt = require('jsonwebtoken');

const registro = async (req = request, res = response) => {
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
            data: datosUsuarios,
            msg: 'Usuario registrado correctamente',
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            msg: 'Error del servidor'
        });
    }
}

const iniciarSesion = async (req = request, res = response) => {
    try {
        const {email, contrasenia} = req.body;

        const usuarios = await Usuarios.findOne({ where: { email } });

        if (!usuarios) {
            return res.status(400).json({
                success: false,
                error: true,
                msg: 'credencia incorrectas'
            });
        }
        const validPassword = bcrypt.compareSync(contrasenia, usuarios.contrasenia);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                error: true,
                msg: 'credencia incorrectas'
            });
        }

        const token = await generateJWT(usuarios.id);

        const {nombre, apellido, email: emailUsuario, } = usuarios;

        const datosUsuarios = {nombre, apellido, email: emailUsuario, token};

        return res.status(200).json({
            success: true,
            data: datosUsuarios,
            msg: 'Usuario logueado correctamente',
        });

    }catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            msg: 'Error al iniciar sesión'
        });
    }
};

const verInformacion = async (req, res) => {
    try{
        const {usuarios} = req;

        const {contrasenia, ...datosUsuarios} = usuarios.toJSON();

        return res.status(200).json({
            success: true,
            data: datosUsuarios,
        });

    }catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            msg: 'Error del servidor'
        });
    }
}

module.exports = {
    registro,
    iniciarSesion,
    verInformacion
}
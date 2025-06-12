const { request, response } = require('express');
const Prestamos = require('../models/Prestamos');
const Libros = require('../models/Libros');
const Usuarios = require('../models/Usuarios'); // si existe

const registrarPrestamos = async (req = request, res = response) => {
    try {
        const { libroId, usuarioId } = req.body;

        const libro = await Libros.findByPk(libroId);
        if (!libro || libro.eliminado) {
            return res.status(404).json({ msg: 'Libro no disponible' });
        }

        const usuario = await Usuarios.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const fechaPrestamo = new Date();
        const fechaDevolucion = new Date();
        fechaDevolucion.setDate(fechaPrestamo.getDate() + 7);

        const prestamos = await Prestamos.create({
            libroId,
            usuarioId,
            fechaPrestamo,
            fechaDevolucion,
            estado: 'prestado'
        });

        return res.status(201).json({
            success: true,
            data: prestamos,
            msg: 'Préstamo registrado correctamente'
        });

    } catch (error) {
        console.error('Error en registrarPrestamos:', error);
        return res.status(500).json({ msg: 'Error al registrar el préstamo' });
    }
};


module.exports = {
    registrarPrestamos
};
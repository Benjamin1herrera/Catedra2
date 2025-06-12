const {request, response} = require('express');
const Libros = require('../models/Libros');
const bcrypt = require('bcryptjs');

const agregarLibro = async (req = request, res = response) => {
    try {
        const {titulo, autor, genero, fechadePublicacion: fechadePublicacion, disponibilidad, eliminado} = req.body;

        const libroExistente = await Libros.findOne({ where: { titulo } });

        if (libroExistente) {
            return res.status(409).json({
                success: false,
                error: true,
                msg: 'El libro ya existe'
            });
        }

        const dataLibro = {titulo, autor, genero, fechadePublicacion: fechadePublicacion, disponibilidad, eliminado};

        const libros = new Libros(dataLibro);

        await libros.save();

        const datosLibro = {
            id: libros.id,
            titulo: libros.titulo,
            autor: libros.autor,
            genero: libros.genero,
            fechadePublicacion: libros.fechadePublicacion,
            disponibilidad: libros.disponibilidad,
            eliminado: libros.eliminado
        };

        return res.status(201).json({
            success: true,
            data: datosLibro,
            msg: 'Libro agregado correctamente',
        });
    
    }catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            msg: 'Error del servidor'
        });
    };
}

module.exports = {
    agregarLibro
};
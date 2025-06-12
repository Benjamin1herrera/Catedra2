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

const listarLibros = async (req = request, res = response) => {
    try {
        const libros = await Libros.findAll();

        return res.status(200).json({
            success: true,
            data: libros,
            msg: 'Listado de libros'
        });
    } catch (error) {
        console.error('Error en getLibros:', error);
        return res.status(500).json({
            success: false,
            error: true,
            msg: 'Error al obtener los libros'
        });
    }
};

const obtenerLibroporId = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const libro = await Libros.findByPk(id);

        if (!libro) {
            return res.status(404).json({
                success: false,
                error: true,
                msg: 'Libro no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: libro,
            msg: 'Libro encontrado'
        });
    } catch (error) {
        console.error('Error en getLibroPorId:', error);
        return res.status(500).json({
            success: false,
            error: true,
            msg: 'Error al obtener el libro'
        });
    }
};

const editarLibro = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const campos = req.body;

        const libro = await Libros.findByPk(id);

        if (!libro) {
            return res.status(404).json({
                success: false,
                error: true,
                msg: 'Libro no encontrado'
            });
        }

        await libro.update(campos);

        return res.status(200).json({
            success: true,
            data: libro,
            msg: 'Libro actualizado correctamente'
        });

    } catch (error) {
        console.error('Error en editarLibro:', error);
        return res.status(500).json({
            success: false,
            error: true,
            msg: 'Error al actualizar el libro'
        });
    }
};


module.exports = {
    agregarLibro,
    listarLibros,
    obtenerLibroporId,
    editarLibro
};
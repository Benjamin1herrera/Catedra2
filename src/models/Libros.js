const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');
const Usuarios = require('./Usuarios');

class Libros extends Model {
    static id;
    static titulo;
    static autor;
    static genero;
    static fechadePublicacion;
    static disponibilidad;
    static eliminado;
}

Libros.init(
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fechadePublicacion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        disponibilidad: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        eliminado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        modelName: 'Libros',
        tableName: 'Libros',
        timestamps: true, // Agrega createdAt y updatedAt
    }
);

Libros.prototype.toJSON = function () {
    const {...libros} = this.get();
    return libros;
}

module.exports = Libros;
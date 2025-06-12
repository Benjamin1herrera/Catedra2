const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');

class Prestamos extends Model {
    static id;
    static fechaPrestamo;
    static fechaDevolucion;
    static estado; // 'activo', 'devuelto', 'atrasado'
}

Prestamos.init(
    {
        fechaPrestamo: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fechaDevolucion: {
            type: DataTypes.DATE,
            allowNull: true, // Puede ser nulo si aún no se ha devuelto
        },
        estado: {
            type: DataTypes.ENUM('prestado', 'devuelto', 'con retraso'),
            defaultValue: 'activo',
        },
    },
    {
        sequelize: db,
        modelName: 'Prestamos',
        tableName: 'Prestamos',
        timestamps: true, // Agrega createdAt y updatedAt
    }
);

Prestamos.Usuarios = Prestamos.belongsTo(require('./Usuarios'), {foreignKey: 'usuarioId', targetKey: 'id',});

Prestamos.Libros = Prestamos.belongsTo(require('./Libros'), {foreignKey: 'libroId', targetKey: 'id',});

Prestamos.prototype.toJSON = function () {
    const {...prestamos} = this.get();
    Prestamos.usuarioId = this.getDataValue('usuarioId');
    Prestamos.libroId = this.getDataValue('libroId');
    return prestamos;
}

module.exports = Prestamos;
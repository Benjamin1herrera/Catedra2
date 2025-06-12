const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');

class Usuarios extends Model {
    static id;
    static nombre;
    static apellido;
    static email;
    static contrasenia;
    static token;
}

Usuarios.init(
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        contrasenia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'Usuarios',
        tableName: 'Usuarios',
        timestamps: true, // Agrega createdAt y updatedAt
    }
);

Usuarios.prototype.toJSON = function () {
    const {contrasenia , ...usuarios} = this.get();
    delete usuarios.contrasenia; // Elimina la contraseña del objeto JSON
    return usuarios;
}

module.exports = Usuarios;
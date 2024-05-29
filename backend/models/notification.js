const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Notification extends Model { }

Notification.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'notification',
    indexes: [
        {
            name: "unq_emailitem",
            unique: true,
            fields: ['email', 'variant_id']
        }
    ]
})

module.exports = Notification
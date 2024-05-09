const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Reminder extends Model { }

Reminder.init({
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
    modelName: 'reminder',
    indexes: [
        {
            name: "unq_emailitem",
            unique: true,
            fields: ['email', 'item_id']
        }
    ]
})

module.exports = Reminder
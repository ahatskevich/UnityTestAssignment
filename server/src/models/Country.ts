// src/models/Country.ts
import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/database';

class Country extends Model {
    declare id: number;
    declare name: string;
}

Country.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Country',
    tableName: 'countries',
    timestamps: false
});

export default Country;
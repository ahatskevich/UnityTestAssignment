import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/database';

class Role extends Model {
    declare id: number;
    declare name: string;
}

Role.init({
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
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false
});

export default Role;

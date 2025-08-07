import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/database';
import Role from './Role';
import Country from './Country';
import Department from './Department';

class Employee extends Model {
    declare id: number;
    declare first_name: string;
    declare last_name: string;
    declare role_id: number;
    declare country_id: number;
    declare department_id: number;
}

Employee.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'countries',
            key: 'id'
        }
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'departments',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
    timestamps: false
});

Employee.belongsTo(Role, { foreignKey: 'role_id' });
Employee.belongsTo(Country, { foreignKey: 'country_id' });
Employee.belongsTo(Department, { foreignKey: 'department_id' });

export default Employee;
import Employee from '../models/Employee';
import Role from '../models/Role';
import Country from '../models/Country';
import Department from '../models/Department';

interface TransformedEmployee {
    id: number;
    first_name: string;
    last_name: string;
    role_id: number;
    country_id: number;
    department_id: number;
    role: string;
    country: string;
    department: string;
}

export const getEmployees = async (): Promise<TransformedEmployee[]> => {
    const employees = await Employee.findAll({
        include: [
            {
                model: Role,
                attributes: ['name']
            },
            {
                model: Country,
                attributes: ['name']
            },
            {
                model: Department,
                attributes: ['name']
            }
        ]
    });

    return employees.map(employee => {
        const plainEmployee = employee.get({ plain: true });
        return {
            ...plainEmployee,
            role: plainEmployee.Role.name,
            country: plainEmployee.Country.name,
            department: plainEmployee.Department.name,
            Role: undefined,
            Country: undefined,
            Department: undefined
        };
    });
};
import Department from '../models/Department';
import Role from '../models/Role';
import Country from '../models/Country';

export const getFilters = async () => {
    const [departments, roles, countries] = await Promise.all([
        Department.findAll(),
        Role.findAll(),
        Country.findAll()
    ]);

    return {
        departments,
        roles,
        countries
    };
};

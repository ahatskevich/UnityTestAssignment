import { Request, Response } from 'express';
import * as employeeService from '../services/employeeService';

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.getEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
};
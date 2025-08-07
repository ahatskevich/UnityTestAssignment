import { Request, Response } from 'express';
import * as filterService from '../services/filterService';

export const getFilters = async (req: Request, res: Response) => {
    try {
        const filters = await filterService.getFilters();
        res.json(filters);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch filters' });
    }
};

import { Router } from 'express';
import * as filterController from '../controllers/filterController';
import * as employeeController from '../controllers/employeeController';

const router = Router();

router.get('/filters', filterController.getFilters);
router.get('/employees', employeeController.getEmployees);

export default router;
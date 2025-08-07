import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import logger from '../utils/logger';

export const errorHandler = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {

    logger.error('Error: %o', {
        name: error.name,
        error: error.message,
        stack: error.stack
    });

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
};

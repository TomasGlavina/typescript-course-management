import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { validationResult } from 'express-validator';

// Error handling middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    logger.error(`${req.method} ${req.url} - Error: ${err.message}`);
    const errorResponse = process.env.NODE_ENV === 'development' ? err : {};
    
    res.status(err.status || 500).json({ 
        message: err.message || 'Internal Server Error',
        error: errorResponse
    });
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    const message = 'Resource not found';
    logger.warn(`${req.method} ${req.url} - ${message}`);
    res.status(404).json({ message });
}

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    logger.info(`${req.method} ${req.url} - ${req.ip} - ${new Date()}`);
    next();
}
// Middleware for validating request data using express-validator
export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return a response if there are validation errors
        logger.error(`Validation failed: ${JSON.stringify(errors.array())}`);
        res.status(400).json({ errors: errors.array() });
    } else {
        // Call next() to continue if there are no validation errors
        next();
    }
};

export default errorHandler;
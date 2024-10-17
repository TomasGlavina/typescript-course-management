import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';


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

//Input validation middleware
import {Schema} from 'joi';

export const validateRequest = (schema: Schema) => {
    return(req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if(error) {
            logger.warn(`${req.method} ${req.url} - Validation error: ${error.message}`);
            return res.status(400).json({ message: 'Validation error', error: error.details });
        }
        next();
    }
}

export default errorHandler;
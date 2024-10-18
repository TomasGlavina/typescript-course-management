import express, { Application, Request, Response, NextFunction } from 'express';
import courseRoutes from './routes/courseRoutes';
import logger from './utils/logger';
import dotenv from 'dotenv';


dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware for logging
app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/courses', courseRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(500).json({error: err.message});
});
// Middleware to catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Forward to the error-handling middleware
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.message}`); // Log the error message
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({
        message: err.message,
        // In production, don't send stack traces
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
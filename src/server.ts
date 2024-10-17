import express, { Application, Request, Response, NextFunction } from 'express';
import courseRoutes from './routes/courseRoutes';
import logger from './utils/logger';
import dotenv from 'dotenv';


dotenv.config();

const app: Application = express();
const PORT: number = process.env.PORT || 3000;

// Middleware for logging
app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/courses', courseRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(500).json({error: err.message});
});

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
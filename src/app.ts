import express from 'express';
import courseRoutes from './routes/courseRoutes';

const app = express();
app.use(express.json());
app.use('/api/courses', courseRoutes);

export default app;
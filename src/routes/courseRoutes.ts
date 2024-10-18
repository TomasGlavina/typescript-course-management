import express from 'express';
import {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} from '../controllers/courseController';
import { requestLogger, validateRequest, errorHandler } from '../middleware/middleware';
import { body } from 'express-validator';
import { asyncHandler } from '../utils/asyncHandler'; // Import asyncHandler

const router = express.Router();

// Use request logger middleware for all routes
router.use(requestLogger);

// Define routes with asyncHandler
router.get('/', asyncHandler(getAllCourses));
router.get('/:id', asyncHandler(getCourseById));

router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('modules').isArray({ min: 1 }).withMessage('Modules must be a non-empty array'),
        validateRequest
    ],
    asyncHandler(createCourse)
);

router.put(
    '/:id',
    [
        body('title').optional().notEmpty().withMessage('Title cannot be empty'),
        body('description').optional().notEmpty().withMessage('Description cannot be empty'),
        body('modules').optional().isArray().withMessage('Modules must be an array'),
        validateRequest
    ],
    asyncHandler(updateCourse)
);

router.delete('/:id', asyncHandler(deleteCourse));

// Error handling middleware
router.use(errorHandler);

export default router;

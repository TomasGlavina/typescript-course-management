import express, { Request, Response, NextFunction } from 'express';
import {Course} from '../models/Course';
import {validateCourse} from '../models/Course';
import logger from '../utils/logger';
import fs, { read } from 'fs';
import {readCourses, writeCourses} from './utils/courseServices';
const router = express.Router();

//Fetch all courses
router.get('/courses', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await readCourses();
        res.status(200).json(courses);
    } catch (err) {
        logger.error(`Error fetching courses: ${err.message}`);
        next(err);
    }
});

//Fetch a single course by id
router.get('/courses/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const courses = await readCourses();
        const course = courses.find((course: Course) => course.id === id);

        if (!course) {
            res.status(404).json({message: 'Course not found'});
        }

        res.status(200).json(course);
    
    } catch (err) {
        logger.error(`Error fetching course: ${err.message}`);
        next(err);
    }
});

// Create a new course

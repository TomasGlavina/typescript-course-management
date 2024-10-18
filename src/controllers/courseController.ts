import { Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course'; // Importing the Course interface
import { addCourse, readCourses, writeCourses } from '../services/courseService'; // Import addCourse from courseService
import logger from '../utils/logger';

// Fetch all courses
export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await readCourses();
        res.status(200).json(courses);
    } catch (err) {
        logger.error('Failed to get courses:', err);
        res.status(500).json({ message: 'Failed to read courses', error: err instanceof Error ? err.message : 'Unknown error' });
    }
};

// Fetch a course by ID
export const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const courses = await readCourses();
        const course = courses.find((c: { id: number }) => c.id === id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (err) {
        next(err); // Pass the error to the global error handler
    }
};
// Create a new course using addCourse from courseService
export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCourseData = {
            title: req.body.title,
            description: req.body.description,
            modules: req.body.modules
        };

        // Use addCourse from courseService to handle the addition
        const newCourse = await addCourse(newCourseData);
        res.status(201).json(newCourse);
    } catch (err) {
        next(err); // Pass the error to the global error handler
    }
};


// Update an existing course
export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await readCourses();
        const courseIndex = courses.findIndex((course: { id: number }) => course.id === parseInt(req.params.id, 10));

        if (courseIndex === -1) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Update the course with the new data
        courses[courseIndex] = {
            id: courses[courseIndex].id,
            title: req.body.title || courses[courseIndex].title,
            description: req.body.description || courses[courseIndex].description,
            modules: req.body.modules || courses[courseIndex].modules
        };

        await writeCourses(courses);
        res.status(200).json(courses[courseIndex]);
    } catch (err) {
        next(err);
    }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        // Read existing courses
        const courses = await readCourses();
        const updatedCourses = courses.filter((c: { id: number }) => c.id !== id);

        if (courses.length === updatedCourses.length) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Write back the updated courses
        await writeCourses(updatedCourses);
        res.status(204).send();
    } catch (err) {
        next(err); // Pass the error to the global error handler
    }
};

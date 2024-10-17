import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Course } from '../models/Course';
import { run } from 'node:test';


// Path to JSON file
const dataPath = path.join(__dirname, '../../courses.json');

// Get all courses
export const getCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
};

// Get a single course by ID
export const getCourseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
        
    } catch (error) {
        next(error);
    }
};

// Create a new course
export const createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        next(error);
    }
};

// Update an existing course
export const updateCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCourse) {
            res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        next(error);
    }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        next(error);
    }
};
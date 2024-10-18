import fs from 'fs/promises';
import path from 'path';
import logger from '../utils/logger';
import { Course } from '../models/Course';

const coursesFilePath = path.join(__dirname, '../../data/courses.json');
const modulesFilePath = path.join(__dirname, '../../data/modules.json');
const lessonsFilePath = path.join(__dirname, '../../data/lessons.json');

// Utility function to read a JSON file
export const readJsonFile = async (filePath: string) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`Failed to read file: ${filePath}. Error: ${err.message}`);
        } else {
            logger.error(`Failed to read file: ${filePath}. Unknown error occurred.`);
        }
        return []; // Return an empty array if the file cannot be read
        }
    };

// Utility function to write a JSON file
export const writeJsonFile = async (filePath: string, data: any) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`Failed to write file: ${filePath}. Error: ${err.message}`);
        } else {
            logger.error(`Failed to write file: ${filePath}. Unknown error occurred.`);
        }
        throw err;
    }
};


export const readCourses = async (): Promise<any[]> => {
    try {
        const data = await fs.readFile(path.resolve(__dirname, '../../data/courses.json'), 'utf-8'); // Adjust the file path as needed
        return JSON.parse(data);
    } catch (err) {
        if (err instanceof Error) {
            logger.error('Failed to read courses: ' + err.message);
            throw new Error('Failed to read courses');
        } else {
            logger.error('Unknown error occurred while reading courses');
            throw new Error('Failed to read courses due to an unknown error');
        }
    }
};

const initializeFileIfMissing = async (filePath: string) => {
    try {
        await fs.access(filePath);
    } catch {
        // If the file does not exist, create it with an empty array
        await fs.writeFile(filePath, JSON.stringify([], null, 2));
    }
};
// Read all modules
export const readModules = async () => readJsonFile(modulesFilePath);

// Read all lessons
export const readLessons = async () => readJsonFile(lessonsFilePath);

// Write updated courses data
export const writeCourses = async (courses: any) => writeJsonFile(coursesFilePath, courses);

// Write updated modules data
export const writeModules = async (modules: any) => writeJsonFile(modulesFilePath, modules);

// Write updated lessons data
export const writeLessons = async (lessons: any) => writeJsonFile(lessonsFilePath, lessons);

export const addCourse = async (newCourse: any) => {
    try {
        // Read existing data from the JSON files
        const courses = await readJsonFile(coursesFilePath);
        const modules = await readJsonFile(modulesFilePath);
        const lessons = await readJsonFile(lessonsFilePath);

        // Generate a new course ID
        const newCourseId = courses.length > 0 ? courses[courses.length - 1].id + 1 : 1;
        newCourse.id = newCourseId;

        // Process modules and lessons for the new course
        newCourse.modules = newCourse.modules.map((module: any) => {
            // Generate a new module ID if it's not already present
            let moduleId = modules.find((m: any) => m.title === module.title)?.id;
            if (!moduleId) {
                moduleId = modules.length > 0 ? modules[modules.length - 1].id + 1 : 1;
                module.id = moduleId;
                modules.push({ id: moduleId, title: module.title, lessons: [] }); // Add to modules.json without the full lesson objects
            }

            // Process the lessons for each module
            module.lessons = module.lessons.map((lesson: any) => {
                // Generate a new lesson ID if it's not already present
                let lessonId = lessons.find((l: any) => l.title === lesson.title)?.id;
                if (!lessonId) {
                    lessonId = lessons.length > 0 ? lessons[lessons.length - 1].id + 1 : 1;
                    lesson.id = lessonId;
                    lessons.push({ ...lesson, id: lessonId }); // Add to lessons.json with the new ID
                }
                return lesson; // Return the full lesson object
            });

            // Update the module's lesson list in modules.json
            const existingModuleIndex = modules.findIndex((m: any) => m.id === moduleId);
            if (existingModuleIndex !== -1) {
                modules[existingModuleIndex].lessons = module.lessons.map((lesson: any) => ({ id: lesson.id, title: lesson.title }));
            }

            return module; // Return the full module object with lessons
        });

        // Add the new course with full module details to courses.json
        courses.push(newCourse);

        // Save the updated data to the respective JSON files
        await writeJsonFile(coursesFilePath, courses);
        await writeJsonFile(modulesFilePath, modules);
        await writeJsonFile(lessonsFilePath, lessons);

        logger.info(`Added new course: ${newCourse.title} with ID ${newCourseId}`);
    } catch (error) {
        logger.error(`Failed to add course: ${error}`);
        throw new Error('Failed to add course');
    }
};




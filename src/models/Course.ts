import { promises as fs } from 'fs'; // Use fs/promises for asynchronous operations
import path from 'path';

interface Content {
    type: string;
    data: string;
}

interface Lesson {
    title: string;
    description: string;
    topics: string[];
    content: Content[];
}

interface Module {
    id: number;
    title: string;
    lessonsId: number[];
}

// Assuming Course is defined as follows
interface Course {
    id: number;
    title: string;
    description: string;
    modules: Module[]; // Array of module objects with id, title, and lessons
}

// Helper function to validate non-empty arrays
const isValidArray = <T>(arr: T[]): boolean => Array.isArray(arr) && arr.length > 0;

// Helper function to validate the course structure
const validateContent = (content: Content[]): boolean => {
    return isValidArray(content) && content.every((c: Content) => c.type && c.data);
};

const validateLessons = (lessons: Lesson[]): boolean => {
    return isValidArray(lessons) && lessons.every((lesson: Lesson) =>
        !!lesson.title &&
        !!lesson.description &&
        isValidArray(lesson.topics) &&
        validateContent(lesson.content)
    );
};

// Helper function to validate the module structure
const validateModules = async (modules: Module[]): Promise<boolean> => {
    const lessons = await readDataFromFile(lessonsFilePath);
    return isValidArray(modules) &&
        modules.every(module =>
            !!module.title &&
            validateLessons(module.lessonsId.map(id => lessons.find(lesson => lesson.id === id)))
        );
};

export const validateCourse = async (course: Course): Promise<boolean> => {
    return !!course.title &&
        !!course.description &&
        await validateModules(course.modules);
};

// File paths
const coursesFilePath = path.join(__dirname, '../../data/courses.json');
const modulesFilePath = path.join(__dirname, '../../data/modules.json');
const lessonsFilePath = path.join(__dirname, '../../data/lessons.json');

// Read data from JSON file asynchronously
const readDataFromFile = async (filePath: string): Promise<any[]> => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
            // File does not exist, return an empty array
            return [];
        }
        throw error; // Re-throw other errors
    }
};

// Write data to JSON file asynchronously
const writeDataToFile = async (filePath: string, data: any[]): Promise<void> => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        throw new Error(`Failed to write to file: ${filePath}. Error: ${(error as Error).message}`);
    }
};

export { Course, Module, Lesson, Content, readDataFromFile, writeDataToFile, coursesFilePath, modulesFilePath, lessonsFilePath };

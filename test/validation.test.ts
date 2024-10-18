// validation.test.ts
import { validateCourse, readDataFromFile } from '../src/models/Course';
import { Course } from '../src/models/Course';

// Mock readDataFromFile to avoid accessing the actual file system
jest.mock('../src/models/Course', () => {
  const originalModule = jest.requireActual('../src/models/Course');
  return {
    ...originalModule,
    readDataFromFile: jest.fn(),
  };
});

beforeAll(() => {
  // Mock the readDataFromFile function to return predefined lessons data
  (readDataFromFile as jest.Mock).mockResolvedValue([
    { id: 1, title: 'Lesson 1', description: 'Description 1', topics: [], content: [] },
    { id: 2, title: 'Lesson 2', description: 'Description 2', topics: [], content: [] },
  ]);
});

describe('Course Validation', () => {
  test('should validate a correct course structure', async () => {
    const validCourse: Course = {
      id: 1,
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming.',
      modules: [
        {
          id: 1,
          title: 'Programming Basics',
          lessonsId: [1, 2],
        },
      ],
    };

    // The mock will provide data for readDataFromFile, preventing real file access
    expect(await validateCourse(validCourse)).toBe(true);
  });

  test('should invalidate an incorrect course structure', async () => {
    const invalidCourse: any = {
      id: 1,
      title: 'Invalid Course',
      description: 'This course has missing fields',
      modules: [
        {
          id: 1,
          title: 'Incomplete Module',
          lessonsId: [],
        },
      ],
    };

    expect(await validateCourse(invalidCourse)).toBe(false);
  });
});

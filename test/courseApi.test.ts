import request from 'supertest';
import app from '../src/app'; // Adjust the path to your app

describe('Course API', () => {
    let courseId: string;

    it('should create a new course', async () => {
        const response = await request(app)
            .post('/api/courses')
            .send({
                title: 'Introduction to TypeScript',
                description: 'Learn the basics of TypeScript',
                modules: [{
                    title: 'TypeScript Basics',
                    lessons: [{
                        title: 'Lesson 1',
                        description: 'Introduction to TypeScript',
                        topics: ['Types', 'Interfaces', 'Classes'],
                        content: [{
                            type: 'text',
                            data: 'TypeScript is a superset of JavaScript.'
                        }]
                    }]
                }]
            });
        expect(response.status).toBe(201);
        courseId = response.body.id;
        console.log('Course ID:', courseId);
    });

    it('should get all courses', async () => {
        const response = await request(app).get('/api/courses');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should get a course by ID', async () => {
        const response = await request(app).get(`/api/courses/2`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 2);
    });

    it('should update a course by ID', async () => {
        const response = await request(app)
            .put(`/api/courses/2`)
            .send({
                title: 'Introduction to TypeScript',
                description: 'Learn the basics of TypeScript',
                modules: [{
                    title: 'TypeScript Basics',
                    lessons: [{
                        title: 'Lesson 1',
                        description: 'Introduction to TypeScript',
                        topics: ['Types', 'Interfaces', 'Classes'],
                        content: [{
                            type: 'text',
                            data: 'TypeScript is a superset of JavaScript.'
                        }]
                    }]
                }]
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Advanced TypeScript');
    });

    it('should delete a course by ID', async () => {
        const response = await request(app).delete(`/api/courses/2`);
        expect(response.status).toBe(204);
    });

    it('should return 404 for a non-existent course', async () => {
        const response = await request(app).get('/courses/nonexistentid');
        expect(response.status).toBe(404);
    });
});

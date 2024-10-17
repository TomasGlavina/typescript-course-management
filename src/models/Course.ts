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
    title: string;
    lessons: Lesson[];
}

interface Course {
    id: number;
    title: string;
    description: string;
    modules: Module[];
}

// Helper function to validate non-empty arrays
const isValidArray = <T>(arr: T[]): boolean => Array.isArray(arr) && arr.length > 0;



//Helper function to validate the course structure
const validateContent = (content: Content[]): boolean => {
    return isValidArray(content) && content.every((c: Content) => c.type && c.data);
}

const validateLessons = (lessons: Lesson[]): boolean => {
    return isValidArray(lessons) && lessons.every( (lesson: Lesson) =>  
        !!lesson.title && 
        !!lesson.description && 
        isValidArray(lesson.topics) &&
        validateContent(lesson.content)
    );
}

// Helper function to validate the module structure
const validateModules = (modules: Module[]): boolean => {
    return isValidArray(modules) &&
        modules.every( module => 
            !!module.title && 
            validateLessons(module.lessons)
        );
}

// Main function to validate course structure before saving
export const validateCourse = (course: Course): boolean => {
    return !!course.title && 
           !!course.description && 
           validateModules(course.modules);
}


const courses: Course[] = [
    {
        id: 1,
        title: "Introduction to Web Development",
        description: "Learn the fundamentals of web development, covering HTML, CSS, and JavaScript.",
        modules: [
            {
                title: "HTML Basics",
                lessons: [
                    {
                        title: "Understanding HTML Structure",
                        description: "Learn about HTML tags and document structure",
                        topics: [
                            "HTML tags",
                            "Document structure",
                            "Semantic HTML"
                        ],
                        content: [
                            {
                                type: "text",
                                data: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser."
                            },
                            {
                                type: "video",
                                data: "https://example.com/intro-to-html-video"
                            }
                        ]
                    },
                    {
                        title: "Working with Forms",
                        description: "Create and style HTML forms",
                        topics: [
                            "Form elements",
                            "Input types",
                            "Form validation"
                        ],
                        content: [
                            {
                                type: "text",
                                data: "HTML forms are used to collect user input. Learn how to create effective and accessible forms."
                            },
                            {
                                type: "audio",
                                data: "https://example.com/html-forms-audio"
                            }
                        ]
                    }
                ]
            },
            {
                title: "CSS Fundamentals",
                lessons: [
                    {
                        title: "CSS Selectors and Properties",
                        description: "Master CSS selectors and common properties",
                        topics: [
                            "Selectors",
                            "Box model",
                            "Colors and typography"
                        ],
                        content: [
                            {
                                type: "text",
                                data: "CSS (Cascading Style Sheets) is used to style and layout web pages."
                            },
                            {
                                type: "video",
                                data: "https://example.com/css-selectors-video"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

export { Course, Module, Lesson, Content, courses };
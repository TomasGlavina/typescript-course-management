TypeScript Course Management API
# TypeScript Course Management API

A simple course management REST API built with TypeScript, Express, and Node.js. This API allows for creating, reading, updating, and deleting course information stored in JSON files.

Video explanation:
https://www.loom.com/share/2e48d3f75c844085a0549315419696da

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Environment Setup](#environment-setup)
    - [Run the Server](#run-the-server)
- [API Documentation](#api-documentation)
    - [Base URL](#base-url)
    - [Endpoints](#endpoints)
    - [Request & Response Examples](#request--response-examples)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The TypeScript Course Management API provides basic functionality for managing courses and their modules. It is designed to be a starting point for learning and working with TypeScript, Express, and Node.js.

The project follows best practices for API development, including structured error handling, input validation, and comprehensive testing.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete courses.
- **Validation**: Ensures input data is properly structured.
- **Error Handling**: Graceful error handling with proper HTTP status codes.
- **Logging**: Uses Winston for logging server activities.
- **Testing**: Includes Jest for unit and integration testing.

## Prerequisites

- Node.js (version 16.x or later)
- npm or yarn
- Git

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/your-username/typescript-course-management.git
cd typescript-course-management
```

### Install Dependencies

Install project dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

### Environment Setup

Create a `.env` file in the project root with the following variables:

```makefile
PORT=3000
NODE_ENV=development
```

Make sure the data directory with `courses.json` is present in the `src` directory. The `courses.json` file should be a JSON array of course objects.

Example `courses.json`:

```json
[
        {
                "id": 1,
                "title": "Introduction to Programming",
                "description": "Learn the basics of programming.",
                "modules": [
                        {
                                "id": 1,
                                "title": "Basics",
                                "lessonsId": [1, 2]
                        }
                ]
        }
]
```

### Run the Server

Start the server in development mode:

```bash
npm run dev
# or
yarn dev
```

The server will be running on [http://localhost:3000](http://localhost:3000).

## API Documentation

### Base URL

The base URL for the API is:

```bash
http://localhost:3000/api/courses
```

### Endpoints

| Method | Endpoint           | Description           |
|--------|---------------------|-----------------------|
| GET    | /api/courses        | Get all courses       |
| GET    | /api/courses/:id    | Get a course by ID    |
| POST   | /api/courses        | Create a new course   |
| PUT    | /api/courses/:id    | Update a course by ID |
| DELETE | /api/courses/:id    | Delete a course by ID |

### Request & Response Examples

#### Get All Courses

**Request**: `GET /api/courses`

**Response**:

```json
[
        {
                "id": 1,
                "title": "Introduction to Programming",
                "description": "Learn the basics of programming.",
                "modules": [
                        {
                                "id": 1,
                                "title": "Basics",
                                "lessonsId": [1, 2]
                        }
                ]
        }
]
```

#### Get Course by ID

**Request**: `GET /api/courses/1`

**Response**:

```json
{
        "id": 1,
        "title": "Introduction to Programming",
        "description": "Learn the basics of programming.",
        "modules": [
                {
                        "id": 1,
                        "title": "Basics",
                        "lessonsId": [1, 2]
                }
        ]
}
```

#### Create a New Course

**Request**: `POST /api/courses`

**Request Body**:

```json
{
        "title": "Advanced Programming",
        "description": "In-depth programming concepts.",
        "modules": [
                {
                        "id": 2,
                        "title": "Advanced Topics",
                        "lessonsId": [3, 4]
                }
        ]
}
```

**Response**:

```json
{
        "id": 2,
        "title": "Advanced Programming",
        "description": "In-depth programming concepts.",
        "modules": [
                {
                        "id": 2,
                        "title": "Advanced Topics",
                        "lessonsId": [3, 4]
                }
        ]
}
```

#### Update a Course

**Request**: `PUT /api/courses/2`

**Request Body**:

```json
{
        "title": "Advanced Programming - Updated",
        "description": "Updated description",
        "modules": [
                {
                        "id": 2,
                        "title": "Updated Topics",
                        "lessonsId": [5, 6]
                }
        ]
}
```

**Response**:

```json
{
        "id": 2,
        "title": "Advanced Programming - Updated",
        "description": "Updated description",
        "modules": [
                {
                        "id": 2,
                        "title": "Updated Topics",
                        "lessonsId": [5, 6]
                }
        ]
}
```

#### Delete a Course

**Request**: `DELETE /api/courses/2`

**Response**: `204 No Content`

## Testing

Run tests using Jest:

```bash
npm test
# or
yarn test
```

Tests include unit and integration tests for both utility functions and the API endpoints.

## Project Structure

```bash
typescript-course-management/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── data/
│       └── courses.json
├── test/
├── .env
├── package.json
└── README.md
```

## Troubleshooting

- **"Cannot read properties of undefined (reading 'map')" Error**: Ensure that the data in `courses.json` is correctly structured as an array of course objects.
- **"ENOENT: no such file or directory" Error**: Verify that the file path for `courses.json` is correct.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to suggest changes.

## License

This project is licensed under the MIT License.
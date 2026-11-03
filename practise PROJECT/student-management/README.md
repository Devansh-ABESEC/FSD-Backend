# Student Management System

A Full Stack Student Management System built using React.js for the frontend and Node.js with Express.js for the backend. Data is managed in-memory on the server.

## Technologies Used

- **Frontend**: React.js, Vite, HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js, CORS
- **Data Storage**: In-memory JavaScript Array

## Features

- **Add Student**: Form with field-level validations (unique Student ID, Name, Email format, Branch dropdown, Semester 1-8, 10-digit Mobile Number).
- **Display Students**: Responsive table showing all student records.
- **Update Student**: Pre-fills existing details into the form and updates records via PUT API.
- **Delete Student**: Confirmation prompt before deleting a student record via DELETE API.
- **Search Student**: Case-insensitive search by Student ID or Student Name.
- **Real-time Feedback**: Dynamic success and error notification banners without page reload.

## Project Structure

```text
student-management/
├── backend/
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchStudent.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentList.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | Fetch all student records |
| `GET` | `/api/students/:id` | Fetch a single student record by ID |
| `POST` | `/api/students` | Add a new student record |
| `PUT` | `/api/students/:id` | Update an existing student record by ID |
| `DELETE` | `/api/students/:id` | Delete a student record by ID |

### Sample POST Request Payload

```json
{
  "id": 101,
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "branch": "CSE",
  "semester": 3,
  "mobile": "9876543210"
}
```

## Installation & Run Instructions

### Prerequisites
- Node.js installed on your system.

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```
The backend server will run at `http://localhost:5000`.

### 2. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```
The React frontend will be accessible at `http://localhost:3000`.

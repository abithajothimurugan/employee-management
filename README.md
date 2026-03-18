# Employee Management System

A full-stack Employee Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
This application allows users to manage employee records including adding, editing, viewing, and deleting employees along with profile image uploads.

---

## Features

- Add new employee
- Edit employee details
- View employee profile
- Delete employee
- Upload employee profile image
- RESTful API integration
- Clean HR dashboard-style UI

---

## Tech Stack

### Frontend
- React.js
- Axios
- React Router
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (Image Upload)

---

## Project Structure
Employee-Management-System
│
├── backend
│ ├── model
│ │ └── Employee.js
│ ├── route
│ │ └── employeeRoutes.js
│ ├── controller
│ │ └── employeeController.js
| |── Middleware
| |└──profileUploads.js
│ ├── uploads
│ └── server.js
│
├── frontend
│ ├── components
| |  └──Sidebar.js
│ ├── pages
│ │ ├── EmployeePage.jsx
│ │ ├── AddEmployee.jsx
│ │ └── ViewEmployee.jsx
│ └── App.js


---

## API Endpoints

| Method | Endpoint | Description |
|------|------|------|
| POST | /api/emp | Add employee |
| GET | /api/emp | Get all employees |
| GET | /api/emp/:id | Get single employee |
| PUT | /api/emp/:id | Update employee |
| DELETE | /api/emp/:id | Delete employee |

---

## Installation

### Clone the repository


### Backend Setup

cd backend
npm install
npm start


### Frontend Setup

cd frontend
npm install
npm start


---

## Image Upload

Employee images are uploaded using **Multer** and stored in the `/uploads` folder on the server.

---
## Author

Abitha J 
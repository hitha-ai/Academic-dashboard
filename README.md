# Academic Dashboard

A full-stack student portal that consolidates essential university services into a single web application. Built with **React.js, Flask, Flask-SQLAlchemy, and SQLite**, the project demonstrates a three-tier architecture, REST API integration, persistent data storage, and client-side PDF generation.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Usage and Testing](#usage-and-testing)
- [Current Limitations](#current-limitations)
- [Future Enhancements](#future-enhancements)
- [Author](#author)
- [License](#license)

---

## Overview

The Academic Dashboard provides a centralized interface for students to access common academic tools and university service modules. The React frontend communicates with a Flask REST API, while SQLite stores the backend-connected data persistently.

The application currently integrates the **Reminders** and **Attendance** modules with the backend. Other modules use demonstration or predefined frontend data.

### Key Highlights

- React-based single-page application with multiple student service modules.
- Flask REST API for backend communication.
- SQLite database with SQLAlchemy ORM.
- Persistent reminder storage across backend restarts.
- Attendance records retrieved from the database.
- JSON-based frontend-backend communication using the Fetch API.
- Input validation and HTTP status-code handling.
- PDF generation for selected academic documents and reports.

---

## Architecture

The application follows a three-tier architecture that separates the presentation layer, backend application logic, and database layer.

```text
+------------------------------------------------------+
|                  PRESENTATION LAYER                 |
|                                                      |
|                    React.js                          |
|             React Router and Hooks                   |
|       Components, Charts, Forms, and PDF Export      |
|                                                      |
|                 http://localhost:3000                |
+---------------------------+--------------------------+
                            |
                            | HTTP Requests / JSON
                            | Fetch API
                            v
+------------------------------------------------------+
|                  APPLICATION LAYER                   |
|                                                      |
|                       Flask                          |
|                  REST API Endpoints                  |
|             Request and Input Validation             |
|                    Flask-CORS                        |
|                  SQLAlchemy ORM                      |
|                                                      |
|                 http://localhost:5000                |
+---------------------------+--------------------------+
                            |
                            | Database Operations
                            | SQLAlchemy ORM
                            v
+------------------------------------------------------+
|                     DATA LAYER                       |
|                                                      |
|                       SQLite                         |
|                                                      |
|          Reminders Table and Attendance Table        |
|                                                      |
|             backend/instance/dashboard.db            |
+------------------------------------------------------+
```

### Data Flow

1. The user interacts with a module in the React frontend.
2. The frontend sends an HTTP request to the appropriate Flask API endpoint.
3. Flask processes the request, validates the input where applicable, and interacts with the database through SQLAlchemy.
4. SQLite stores or retrieves the requested records.
5. Flask returns a JSON response with an appropriate HTTP status code.
6. React updates the user interface using the response received from the backend.

---

## Features

### 1. Reminders Management

- Create reminders through the frontend.
- Retrieve saved reminders from the backend.
- Delete reminders using their unique identifiers.
- Store reminder data persistently in SQLite.
- Validate input before creating reminders.
- Update the interface using API responses.
- Retain saved reminders after restarting the Flask server.

**Backend integration:** Implemented using Flask REST API endpoints and SQLAlchemy.

### 2. Attendance Tracker

- Retrieve attendance records from the SQLite database.
- Display attendance information for multiple subjects.
- Present attendance summaries and percentage indicators.
- Visualize attendance trends using Recharts.
- Use color-coded indicators to highlight attendance levels.

**Backend integration:** Attendance records are retrieved through the Flask API.

### 3. Dashboard

- Centralized navigation to available student services.
- Component-based interface using React.
- Organized access to academic and administrative modules.

### 4. CGPA Calculator

- Calculate CGPA using subject credits and grades or scores, according to the implemented calculation logic.
- Display academic performance summaries.

### 5. Examination Schedule

- Display examination timetables.
- Organize subject details, dates, times, and venues.

### 6. Results Viewer

- Display semester-wise academic results.
- Calculate SGPA according to the implemented grading logic.
- Export results as PDF documents using jsPDF.

### 7. Fee Payment

- Display semester-wise fee details.
- Show demonstration payment history.
- Generate PDF receipts where supported.

### 8. Transport Management

- Display bus route and stop information.
- Show transport schedules.
- Generate a PDF bus pass where supported.

### 9. Hostel Management

- Display room and hostel information.
- Present the mess menu.
- Support demonstration complaint registration and status tracking.
- Generate PDF receipts where supported.

### 10. Login Interface

- Provide a demonstration login interface.
- Validate selected input formats on the frontend.
- Demonstrate password-field validation.

**Note:** The login interface does not implement production-grade authentication or user account management.

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js 18 | Component-based user interface |
| JavaScript | Frontend application logic |
| React Router DOM 6 | Client-side navigation |
| React Hooks | Component state and lifecycle-related logic |
| HTML5 | Application structure |
| CSS3 | Styling and layout |
| Recharts | Data visualization |
| React Icons | Interface icons |
| jsPDF | Client-side PDF generation |
| jspdf-autotable | Tabular PDF formatting |
| Fetch API | Communication with backend REST APIs |

### Backend

| Technology | Purpose |
|---|---|
| Python 3 | Backend programming language |
| Flask | Web framework and REST API development |
| Flask-CORS | Cross-origin request configuration |
| Flask-SQLAlchemy | ORM-based database integration |

### Database

| Technology | Purpose |
|---|---|
| SQLite | Relational database for persistent storage |
| SQLAlchemy | Database models and ORM operations |

### Development Tools

- Visual Studio Code
- Node.js and npm
- Python virtual environment (`venv`)
- Git
- GitHub

---

## API Endpoints

The backend API base URL during local development is:

```text
http://localhost:5000
```

### Reminders

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reminders` | Retrieve saved reminders |
| POST | `/api/reminders` | Create a reminder |
| DELETE | `/api/reminders/<id>` | Delete a reminder by ID |

#### Example: Create a Reminder

**Request**

```http
POST /api/reminders
Content-Type: application/json
```

**Example JSON body**

```json
{
  "title": "Submit Web Technology Assignment",
  "date": "2026-05-10",
  "time": "23:59"
}
```

The request fields should match the validation rules implemented in the backend.

**Expected behavior:** If the request is valid, the backend creates and stores the reminder and returns an appropriate success response.

### Attendance

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/attendance` | Retrieve attendance records |

### Health Check

If implemented in the Flask application, the following endpoint can be used to check backend availability.

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check whether the backend is running |

### HTTP Status Codes

The application uses or may return the following status codes, depending on the endpoint and its error-handling implementation.

| Status Code | Meaning |
|---|---|
| `200 OK` | Request completed successfully |
| `201 Created` | Resource created successfully |
| `400 Bad Request` | Invalid request or validation failure |
| `404 Not Found` | Requested resource does not exist |
| `500 Internal Server Error` | Unexpected server-side error |

**Note:** The actual status codes depend on the responses configured in each Flask route. Verify them against your implementation.

---

## Project Structure

The following is a representative project structure. Adjust file and directory names to match your actual repository.

```text
academic-dashboard/
|
|-- backend/
|   |-- app.py
|   |-- models.py
|   |-- seed.py
|   |-- requirements.txt
|   |-- instance/
|   |   |-- dashboard.db
|   |
|   |-- venv/                     # Local virtual environment
|
|-- public/
|   |-- index.html
|
|-- src/
|   |-- components/
|   |   |-- Attendance/
|   |   |   |-- AttendanceTracker.js
|   |   |
|   |   |-- CGPA/
|   |   |   |-- CGPACalculator.js
|   |   |
|   |   |-- Dashboard/
|   |   |   |-- Dashboard.js
|   |   |
|   |   |-- Exam/
|   |   |   |-- ExamSchedule.js
|   |   |
|   |   |-- FeePayment/
|   |   |   |-- FeePayment.js
|   |   |
|   |   |-- Hostel/
|   |   |   |-- Hostel.js
|   |   |
|   |   |-- Login/
|   |   |   |-- Login.js
|   |   |
|   |   |-- Reminder/
|   |   |   |-- ReminderSystem.js
|   |   |
|   |   |-- Result/
|   |   |   |-- ResultViewer.js
|   |   |
|   |   |-- Transport/
|   |       |-- Transport.js
|   |
|   |-- styles/
|   |   |-- App.css
|   |
|   |-- App.js
|   |-- index.js
|
|-- .gitignore
|-- package.json
|-- README.md
```

**Database note:** `dashboard.db` is generated locally by the backend setup. The database file does not need to be committed if the application creates and seeds it during setup.

---

## Prerequisites

Install the following before running the application:

- **Node.js and npm:** For installing and running the React frontend.
- **Python 3:** For running the Flask backend.
- **Git:** For cloning the repository.

Verify the installations:

```bash
node --version
npm --version
python --version
git --version
```

On some systems, use `python3` instead of `python`.

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hitha-ai/Academic-dashboard.git
cd Academic-dashboard
```

Ensure that the repository URL and capitalization match your actual GitHub repository.

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment.

**Windows — Command Prompt**

```bat
venv\Scripts\activate
```

**Windows — PowerShell**

```powershell
.\venv\Scripts\Activate.ps1
```

**macOS / Linux**

```bash
source venv/bin/activate
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

If your project includes a database seeding script, initialize the database:

```bash
python seed.py
```

The script should create or initialize the database and insert the configured sample records. Its exact output depends on your implementation.

### 3. Start the Backend Server

From the `backend` directory, run:

```bash
python app.py
```

The backend should be accessible at:

```text
http://localhost:5000
```

Keep this terminal open while using the application.

### 4. Set Up the Frontend

Open a **new terminal** and navigate to the project root:

```bash
cd Academic-dashboard
```

If you are already in the project root, run only the following commands.

Install the frontend dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend should open at:

```text
http://localhost:3000
```

### 5. Run Both Applications

Keep both development servers running:

| Component | Local URL |
|---|---|
| React frontend | `http://localhost:3000` |
| Flask backend | `http://localhost:5000` |
| SQLite database | `backend/instance/dashboard.db` |

The frontend requires the backend to be running for the integrated Reminders and Attendance features.

---

## Usage and Testing

### Demo Login

The login page is intended for demonstration purposes.

- Use an input that satisfies the email validation configured in the frontend.
- Enter a password that satisfies the implemented password validation.
- No real account verification should be assumed.

For example, if the current validation requires a REVA email address and a minimum six-character password, use inputs that meet those requirements.

### Test Reminder Persistence

To verify that reminders are stored in SQLite:

1. Start the Flask backend.
2. Open the React application.
3. Navigate to the Reminders module.
4. Create a reminder using valid input.
5. Confirm that the reminder appears in the interface.
6. Stop the Flask server using `Ctrl + C`.
7. Restart the backend using `python app.py`.
8. Refresh the frontend.
9. Confirm that the previously created reminder is still present.

This verifies persistence across backend restarts when the same SQLite database is reused.

### Test Attendance Loading

1. Start both the frontend and backend.
2. Navigate to the Attendance module.
3. Confirm that attendance records are loaded from the backend.
4. Check that the displayed subject information and summary match the returned database records.

If the database is seeded with 12 attendance records, the module should display the records according to the implemented frontend logic.

### Test the API Directly

If `curl` is installed, use the following commands to inspect the API responses.

**Retrieve reminders**

```bash
curl http://localhost:5000/api/reminders
```

**Retrieve attendance records**

```bash
curl http://localhost:5000/api/attendance
```

**Check backend health, if the endpoint is implemented**

```bash
curl http://localhost:5000/api/health
```

**Create a reminder**

```bash
curl -X POST http://localhost:5000/api/reminders \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Reminder\",\"date\":\"2026-05-10\",\"time\":\"23:59\"}"
```


---

## Current Limitations

The application is a student project intended to demonstrate frontend development and selected full-stack integration capabilities.

- **Authentication:** The login interface is a frontend demonstration and does not provide production-grade authentication, password hashing, or session management.
- **Partial backend integration:** Reminders and Attendance are connected to the Flask backend. Other modules use frontend demonstration data unless separately integrated.
- **Reminder operations:** The documented API supports creating, retrieving, and deleting reminders. An update endpoint is not included in the documented implementation.
- **Testing:** Automated backend and frontend tests should be added as the project evolves.
- **Deployment:** The documented configuration is intended for local development.
- **Security:** Production deployment would require appropriate authentication, authorization, secure configuration, input validation, and deployment-specific CORS settings.

---

## Future Enhancements

- [ ] Implement authentication with secure password hashing and session or token management.
- [ ] Add update functionality to complete reminder CRUD operations.
- [ ] Extend backend integration to CGPA, examination schedules, results, fees, transport, and hostel modules.
- [ ] Add automated backend tests using `pytest`.
- [ ] Add frontend tests using an appropriate React testing framework.
- [ ] Improve form validation and centralized API error handling.
- [ ] Add environment-based configuration for API URLs and secrets.
- [ ] Deploy the frontend and backend to suitable hosting platforms.
- [ ] Configure a CI/CD workflow for automated testing and deployment.
- [ ] Introduce optional study-planning recommendations and attendance alerts.

---

## Author

**Hitha**

GitHub: [@hitha-ai](https://github.com/hitha-ai)

---

## License

This project was developed for academic and learning purposes. No specific open-source license is granted unless a license file is included in the repository.

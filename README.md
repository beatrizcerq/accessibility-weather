# Accessibility Weather

Accessibility Weather is a web application that allows users to view and report **temporary accessibility conditions** in a specific area, such as a university campus.

Instead of only showing whether a location is generally accessible, the application focuses on changes that may affect accessibility **right now**, such as a broken elevator, blocked pathway, closed accessible entrance, or construction.

## Features

The current proof of concept includes:

* Interactive map using Leaflet and OpenStreetMap
* Accessibility issue reporting form
* Issue categories including:

  * Elevator
  * Accessible entrance
  * Automatic door
  * Accessible pathway
  * Accessible restroom
  * Construction
  * Other
* Location and description for each report
* Expected duration of the issue
* Timestamp for submitted reports
* REST API for submitting and retrieving reports
* SQLite database for storing accessibility reports
* Reports displayed on the map

## Technologies

### Frontend

* JavaScript
* React
* Vite
* Leaflet
* React-Leaflet

### Backend

* Node.js
* Express
* CORS
* SQLite
* better-sqlite3

### Other

* OpenStreetMap
* Git
* GitHub

## Project Structure

```text
accessibility-weather/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── ReportForm.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── server.js
│   ├── database.js
│   ├── accessibility.db
│   └── package.json
│
├── .gitignore
└── README.md
```

## Requirements

To run the project locally, you will need:

* Windows, macOS, or Linux
* Node.js
* npm
* Git
* A modern web browser

The current development environment uses:

* Windows 11
* Node.js 24.21.0
* npm 11.19.0
* Git 2.55.0

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/accessibility-weather.git
cd accessibility-weather
```

### Install frontend dependencies

```bash
cd client
npm install
```

### Install backend dependencies

Open a second terminal and navigate to the server folder:

```bash
cd accessibility-weather/server
npm install
```

## Running the Application

The frontend and backend need to run separately.

### 1. Start the backend

From the `server` folder:

```bash
node server.js
```

The backend will run at:

```text
http://localhost:3000
```

### 2. Start the frontend

Open another terminal and go to the `client` folder:

```bash
npm run dev
```

Vite will provide a local address, normally:

```text
http://localhost:5173
```

Open the address in a web browser.

## How It Works

A user can submit a temporary accessibility issue through the reporting form.

The report includes:

1. Issue type
2. Location
3. Description
4. Expected duration

When the user submits the form:

```text
React Form
     ↓
Express REST API
     ↓
SQLite Database
     ↓
Saved Accessibility Report
     ↓
React Map
```

The backend provides the following API endpoints:

### Get Reports

```http
GET /api/reports
```

Returns the accessibility reports stored in the database.

### Create Report

```http
POST /api/reports
```

Creates a new accessibility report.

Example request:

```json
{
  "issueType": "Elevator",
  "location": "Anderson Hall",
  "description": "Main elevator is currently not working",
  "duration": "Several hours"
}
```

## Database

The application uses SQLite to store accessibility reports.

Each report currently contains:

* `id`
* `issue_type`
* `location`
* `description`
* `duration`
* `created_at`

The database is created automatically when the backend is started.

## Current Proof of Concept

The current version demonstrates the basic end-to-end functionality of the application:

1. A user submits an accessibility issue.
2. The React frontend sends the report to the Express backend.
3. The backend validates and stores the report in SQLite.
4. Reports can be retrieved through the REST API.
5. Retrieved reports are displayed on the interactive map.

## Future Improvements

Future versions could include:

* More precise map locations for individual reports
* Automatic expiration of old reports
* User confirmation of existing reports
* Filters by accessibility issue type
* Status indicators for current and resolved issues
* Support for multiple campuses or public locations
* Scheduled construction and maintenance information
* Improved accessibility features for the application itself

## Purpose

Accessibility Weather is being developed as a software design project for **CIS 3296 – Software Design**.

The goal is to explore how software can provide more useful accessibility information by treating accessibility as a **changing condition**, rather than only as a permanent characteristic of a location.

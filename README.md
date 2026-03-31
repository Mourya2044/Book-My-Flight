# Book My Flight

A full-stack application to manage special flight deals and bookings.

## What This Project Does

- Users can view active deals and book flights.
- Users can view bookings using their phone number.
- Admin can create, update, and delete deals.
- Admin can view all bookings.

## Stack

- Backend: Java 21, Spring Boot, Spring Data JPA, PostgreSQL
- Frontend: React, Vite, Tailwind CSS

## Project Structure

```text
.
├── README.md
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/mourya/backend/
│       │   ├── controller/
│       │   ├── service/
│       │   ├── repository/
│       │   ├── model/
│       │   ├── dto/
│       │   └── config/
│       └── resources/application.yaml
└── frontend/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── api/api.js
    │   └── App.jsx
    ├── tailwind.config.js
    └── vite.config.js
```

## Prerequisites

- Java 21+
- Node.js 18+
- PostgreSQL running locally

## Setup

1. Create database:

```sql
CREATE DATABASE flight_booking_system;
```

2. Confirm backend database config in backend/src/main/resources/application.yaml:
- url: jdbc:postgresql://localhost:5432/flight_booking_system
- username: postgres
- password: postgres

## Run Locally

### Backend (port 8080)

Windows:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

macOS/Linux:

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend (port 5173)

```bash
cd frontend
npm install
npm run dev
```

## Routes

- / : active deals
- /my-bookings : bookings by phone number
- /admin : manage deals
- /admin/bookings : all bookings

## API Summary

Base URL: http://localhost:8080

### Deals

- GET /deals
- POST /deals
- PUT /deals/{id}
- DELETE /deals/{id}

Deal payload:

```json
{
  "departureCity": "Kolkata",
  "arrivalCity": "Delhi",
  "cost": 3500,
  "startTime": "2026-04-01T10:00:00",
  "endTime": "2026-04-01T12:00:00"
}
```

### Bookings

- POST /booking
- GET /booking/client/{phoneNumber}
- GET /booking/admin

Booking request payload:

```json
{
  "dealId": "4a8fdb4c-a950-4f7d-b046-8bfcf056f0ff",
  "phoneNumber": "9876543210"
}
```

## Important Notes

- Home page shows only active deals (current time must be between startTime and endTime).
- CORS is configured for http://localhost:5173.
- Hibernate is set to ddl-auto: update.

## Useful Commands

Backend test and package:

```powershell
cd backend
.\mvnw.cmd test
.\mvnw.cmd clean package
```

Frontend build:

```bash
cd frontend
npm run build
```

## Common Issues

- No deals shown: check deal startTime and endTime.
- DB connection fails: verify PostgreSQL is running and credentials are correct.
- CORS error: frontend must run on http://localhost:5173.



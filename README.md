# Book My Flight - Full Stack Flight Deals & Booking System

A full-stack web application for publishing special flight deals and booking them using a phone number.

The project has:
- A Spring Boot backend with PostgreSQL for deal/booking APIs
- A React + Vite frontend for users and admin operations

## Features

### User Features
- View currently active deals on the home page
- Book a deal by entering a phone number
- View personal bookings by phone number

### Admin Features
- Create, edit, and delete special flight deals
- View all bookings across all users

### Backend Behavior
- Returns only active deals where current time is between startTime and endTime
- Stores booking timestamp automatically when a booking is created
- Supports CORS for local frontend development

## Tech Stack

### Backend
- Java 21
- Spring Boot 4.0.3
- Spring Web
- Spring Data JPA
- PostgreSQL
- Maven Wrapper

### Frontend
- React 18
- Vite 5
- React Router DOM
- Tailwind CSS
- Radix UI Dialog

## Project Structure

```text
Assignment 4/
  backend/
    src/main/java/com/mourya/backend/
      controller/
      service/
      repository/
      model/
      dto/
      config/
    src/main/resources/application.yaml
    pom.xml
    mvnw.cmd
  frontend/
    src/
      pages/
      components/
      api/
      App.jsx
    package.json
```

## System Requirements

- Java 21+
- Maven (optional, wrapper included)
- Node.js 18+ and npm
- PostgreSQL 14+ (or compatible)

## Quick Start

## 1) Clone and open project

```bash
git clone <your-repo-url>
cd "Assignment 4"
```

## 2) Configure PostgreSQL

Create a database:

```sql
CREATE DATABASE flight_booking_system;
```

Current backend DB settings (from application.yaml):
- URL: jdbc:postgresql://localhost:5432/flight_booking_system
- Username: postgres
- Password: postgres

If needed, update them in:
- backend/src/main/resources/application.yaml

## 3) Run backend (Spring Boot)

From the backend directory:

### Windows PowerShell
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

### macOS/Linux
```bash
cd backend
./mvnw spring-boot:run
```

Backend default URL:
- http://localhost:8080

## 4) Run frontend (React + Vite)

From the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL:
- http://localhost:5173

## 5) Open app

- Main app: http://localhost:5173
- Admin page: http://localhost:5173/admin
- My bookings page: http://localhost:5173/my-bookings
- Admin bookings page: http://localhost:5173/admin/bookings

## API Reference

Base URL:
- http://localhost:8080

## Deals API

### GET /deals
Returns active deals only.

Example response:

```json
[
  {
    "id": "4a8fdb4c-a950-4f7d-b046-8bfcf056f0ff",
    "departureCity": "Kolkata",
    "arrivalCity": "Delhi",
    "cost": 3500,
    "startTime": "2026-04-01T10:00:00",
    "endTime": "2026-04-01T12:00:00"
  }
]
```

### POST /deals
Creates a deal.

Request body:

```json
{
  "departureCity": "Kolkata",
  "arrivalCity": "Delhi",
  "cost": 3500,
  "startTime": "2026-04-01T10:00:00",
  "endTime": "2026-04-01T12:00:00"
}
```

### PUT /deals/{id}
Updates an existing deal.

### DELETE /deals/{id}
Deletes a deal by UUID.

## Booking API

### POST /booking
Creates a booking.

Request body:

```json
{
  "dealId": "4a8fdb4c-a950-4f7d-b046-8bfcf056f0ff",
  "phoneNumber": "9876543210"
}
```

Example response:

```json
{
  "id": "dc5de70a-7c7f-4fb9-95d2-394ef1f2420a",
  "deal": {
    "id": "4a8fdb4c-a950-4f7d-b046-8bfcf056f0ff",
    "departureCity": "Kolkata",
    "arrivalCity": "Delhi",
    "cost": 3500,
    "startTime": "2026-04-01T10:00:00",
    "endTime": "2026-04-01T12:00:00"
  },
  "phoneNumber": "9876543210",
  "bookingTime": "2026-04-01T08:30:15"
}
```

### GET /booking/client/{phoneNumber}
Returns bookings for one phone number.

### GET /booking/admin
Returns all bookings.

## Frontend Pages and Routes

- / : Home page, shows active deals and allows booking
- /my-bookings : Search bookings by phone number
- /admin : Manage deals (create, update, delete)
- /admin/bookings : View all bookings

## Data Model

### SpecialDeal
- id (UUID)
- departureCity (String)
- arrivalCity (String)
- cost (double)
- startTime (LocalDateTime)
- endTime (LocalDateTime)

### Booking
- id (UUID)
- deal (Many-to-One -> SpecialDeal)
- phoneNumber (String)
- bookingTime (LocalDateTime)

## Configuration Notes

- Backend CORS is configured for:
  - http://localhost:5173
- Hibernate setting:
  - ddl-auto: update
- SQL logging is enabled:
  - show-sql: true

## Useful Commands

### Backend

```bash
cd backend
./mvnw test
./mvnw clean package
```

Windows equivalent:

```powershell
cd backend
.\mvnw.cmd test
.\mvnw.cmd clean package
```

### Frontend

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

## Troubleshooting

### 1) CORS error in browser
- Ensure frontend runs on http://localhost:5173
- Ensure backend CORS allowed origin matches frontend URL

### 2) Backend cannot connect to database
- Verify PostgreSQL is running
- Verify database name, username, and password in application.yaml
- Confirm port 5432 is available

### 3) No deals visible on home page
- Only active deals are returned
- Check that current time is between startTime and endTime

### 4) Port already in use
- Change backend server port in Spring configuration or stop the conflicting process
- Change frontend Vite port if needed

## Security and Production Notes

This project is intended for academic/demo use and currently has no authentication/authorization.
For production usage, add:
- Role-based auth for admin endpoints
- Input validation and stronger error handling
- Environment-variable based secrets management
- HTTPS and reverse proxy setup



git# 🏃‍♀️ Marathon Management System

A full-stack web application to manage and participate in marathon events. Users can browse upcoming marathons, register for events, and organizers can create and manage their events.

## 🔗 Live Website('https://marathon-management-syst-38d0d.web.app/')

## 🚀 Features

### 🔒 Authentication & Authorization
- Firebase Authentication (Email/Password)
- JWT-based route protection
- Login & Registration pages
- Protected routes for Dashboard, Add Marathon, and My Apply

### 🏁 Marathon Management
- Add a new marathon with title, location, dates, and distance
- Dynamic registration period and marathon date using `react-datepicker`
- Update/Delete marathons (for creators)

### 👟 Registration System
- Register for marathons if available
- Prevent duplicate registration
- Count and display total registrations

### 📊 Dashboard
- User dashboard with "My Apply" list
- Organizer dashboard with marathons created by the user
- Admin dashboard (if implemented)

### 📅 Upcoming Marathons
- Auto-filters and displays upcoming events based on current date

### 🔎 Filter & Sort
- Filter marathons by distance, date
- Sort marathons by date and popularity

### 🔐 Backend
- Built with Node.js, Express.js, MongoDB
- Protected routes with JWT
- Stores users, marathons, and registration info

## 🛠️ Tech Stack

### Frontend
- React
- React Router DOM
- Firebase Authentication
- Tailwind CSS + DaisyUI
- SweetAlert2
- React Datepicker
- JWT
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- dotenv
- CORS
- JWT (`jsonwebtoken`)

## 📦 Installation & Development
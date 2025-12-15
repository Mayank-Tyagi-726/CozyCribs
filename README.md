# 🏠 CozyCribbs — PG Listing & Booking Web Application

CozyCribbs is a full-stack PG (Paying Guest) listing and booking web application built to explore and implement core backend and frontend concepts used in real-world accommodation platforms. The application allows users to browse PG listings, apply filters, view detailed property information, and make date-based bookings, focusing on backend logic, authentication, and clean MVC architecture.

---

## 🎯 Motivation

Finding affordable and well-managed PG accommodations is a common challenge for students and working professionals. The goal of CozyCribbs was to understand how real-world listing platforms work under the hood and to build a structured, scalable web application that handles listings, user sessions, bookings, and availability logic.

This project was built as a **hands-on learning and engineering exercise**, emphasizing backend development with Node.js, database modeling using MongoDB, and server-side rendering with EJS.

---

## ✨ Key Features

- User authentication and authorization using Passport.js  
- Session-based login with protected routes  
- Create, read, update, and delete PG listings (CRUD operations)  
- Image upload support for listings using Multer  
- Search and filter PGs by location, country, and price  
- Date-based booking system with availability checks  
- Prevention of overlapping bookings  
- Dynamic price calculation based on stay duration  
- Review and rating system for listings  
- Responsive UI optimized for desktop and mobile devices  
- Flash messages for real-time user feedback  

---

## 🛠️ Tech Stack

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  

### Frontend
- EJS (Embedded JavaScript Templates)  
- HTML5  
- CSS3  
- Bootstrap  
- Vanilla JavaScript  

### Authentication & Utilities
- Passport.js  
- Express-Session  
- Connect-Flash  
- Multer  

---

## 🧱 System Architecture

Client (EJS + JavaScript)
↓
Express Routes
↓
Controllers
↓
Mongoose Models
↓
MongoDB

yaml
Copy code

---

## 📸 Screenshots

_Add screenshots inside a `screenshots/` folder and reference them below._

- Home Page  
- PG Listings Page  
- Search & Filter View  
- Listing Details Page  
- Booking & Availability Flow  
- Login & Signup Screens  

_(Screenshots intentionally excluded from the repository preview and can be added later.)_

---

## 📂 Project Structure

CozyCribbs/
├── controller/
├── models/
├── public/
│ ├── css/
│ └── js/
├── views/
├── uploads/
├── utils/
├── middleware.js
├── app.js
└── README.md

yaml
Copy code

---



📚 Learning Outcomes
Practical experience with full-stack web development

Understanding of MVC architecture and RESTful routing

Authentication and session management

Database schema design and relationships

Real-world booking logic and edge-case handling

Clean code organization and modular backend design

👨‍💻 Author
Mayank Tyagi
Aspiring Full-Stack Web Developer
Focused on backend engineering, scalable architectures, and real-world problem solving.

📌 Note
CozyCribbs is a portfolio-focused demo application designed to showcase development skills and backend logic. While not deployed to production, the architecture and implementation are structured to support future scalability.

## ⚙️ Local Setup

```bash
# Clone the repository
git clone https://github.com/Mayank-Tyagi-726/CozyCribs.git

# Install dependencies
npm install

# Start the development server
node app.js



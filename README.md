# QuickCourt - A Local Sports Booking Platform

![QuickCourt Hero](frontend/src/assets/img1.png)

### Your Game, Your Court, Your Time!

QuickCourt is a modern, full-stack web application designed to seamlessly connect sports enthusiasts with local sports venues. Users can find, book, and pay for court time in just a few clicks, while facility owners get a powerful dashboard to manage their venues, track bookings, and monitor earnings.

---

### 📹 Video Demonstration

*(Here you can add a link to your project demonstration video)*

**[Insert Your YouTube/Vimeo Video Link Here]**

---

## ✨ Key Features

QuickCourt is built with distinct user roles in mind, providing a tailored experience for everyone.

* **Intuitive Venue Discovery:** Search and filter venues by name, location, sport, and price.
* **Location-Based Search:** Instantly find the nearest courts using your current location.
* **Detailed Venue Pages:** View photos, amenities, pricing, and maps for each venue.
* **Real-Time Booking:** Select your desired sport, date, and time to book instantly.
* **Secure Online Payments:** Seamless and secure payment process powered by Stripe.
* **User & Owner Dashboards:** Separate, feature-rich dashboards for players and facility owners.
* **Admin Oversight:** A full admin panel to manage all users, venues, and bookings.

---

## 🔐 Core Security & Functionality

The application is built on a foundation of modern security and reliability features.

### Token-Based Authentication (JWT)
* **Secure Logins:** After login, the server issues a secure, signed JSON Web Token (JWT).
* **Stateless Verification:** Each request is verified with the JWT, making the system fast and scalable.
* **Protected Routes:** User data and actions are protected; only valid token-holders can access them.

### OTP Verification
* **Email Confirmation:** New users verify their account by entering a One-Time Password sent to their email.
* **Prevents Fake Accounts:** Ensures users have a valid, accessible email address, reducing spam.
* **Builds User Trust:** A familiar and professional security step for user registration.

### Input Validation
* **Client-Side Checks:** Instant feedback in the browser for correctly formatted inputs (e.g., email format).
* **Server-Side Security:** The Django backend rigorously validates all data before it touches the database.
* **Protects Data Integrity:** Ensures all data is clean, consistent, and safe from malicious input.

### Role-Based Access Control
* **Defined User Roles:** The system clearly separates Players, Facility Owners, and Admins.
* **Tailored UI:** The interface changes based on the user's role, showing only relevant options.
* **Secure Endpoints:** Prevents users from accessing data or performing actions outside their permitted role.

---

## 🛠️ Tech Stack

This project is a monorepo containing a Django backend and a React frontend.

| Category | Technology |
| :--- | :--- |
| **Frontend** | **React (Vite)**, **Tailwind CSS**, **Framer Motion**, **Lucide React**, **Axios** |
| **Backend** | **Django**, **Django REST Framework**, **Simple JWT**, **MySQL** |
| **APIs & Services**| **Stripe**, **Google Maps API**, **Cloudinary**, **Overpass API** |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Python 3.10+ and `pip`
* Node.js and `npm`
* A MySQL database server

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/sidrajagrawal/quickcourt_prevision.git](https://github.com/sidrajagrawal/quickcourt_prevision.git)
    cd quickcourt_prevision
    ```

2.  **Backend Setup (Django):**
    ```sh
    cd backend/backend
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```

3.  **Frontend Setup (React):**
    ```sh
    cd frontend
    npm install
    npm run dev
    ```

### Environment Variables

You will need to create `.env` files for both the backend and frontend.

* **Backend (`backend/backend/.env`):**
    ```env
    SECRET_KEY=your_django_secret_key
    DEBUG=True
    EMAIL_HOST_USER=your_email@gmail.com
    EMAIL_HOST_PASSWORD=your_app_password
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    ```

* **Frontend (`frontend/.env`):**
    ```env
    VITE_Maps_API_KEY="your_Maps_api_key"
    ```

---

## 📁 Project Structure

The project is organized into two main parts: `frontend` and `backend`.

```
quickcourt_prevision/
├── backend/
│   ├── backend/          # Django project folder
│   ├── accounts/         # User management app
│   ├── bookings/         # Booking logic app
│   └── venues/           # Venue management app
└── frontend/
    └── src/
        ├── Components/   # Reusable UI components
        └── App.jsx       # Main application component
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

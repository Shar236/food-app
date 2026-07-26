# 🍱 Mealora (Food App)

> **"Food that Matches Your Moment."**

Mealora is a full-stack, feature-rich food ordering & delivery web application. Built with React 19, Tailwind CSS, Node.js, Express, and Socket.IO, Mealora delivers an interactive experience tailored for customers, restaurant partners, delivery personnel, and platform administrators.

---

## ✨ Key Features

- 🎭 **AI Mood Matcher**: Find dishes matched to your current vibe and appetite.
- 🎰 **Spin the Wheel**: Gamified promo & reward generator for discounts.
- 🚴 **Real-Time Order Tracking**: Live updates powered by Socket.IO with animated route simulation.
- 👥 **Group Ordering**: Shared cart links with split-bill capabilities.
- 📅 **Smart Meal Planner**: Generate personalized weekly meal schedules.
- 🥗 **Nutritional Breakdown**: Deep-dive into macro & calorie breakdown for every dish.
- 👥 **Multi-Role Portal**: Seamlessly switch between **Customer**, **Restaurant Partner**, **Delivery Driver**, and **Admin** dashboards.
- 🌙 **Dark & Light Themes**: Modern glassmorphic visual interface with fluid dark mode support.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4 & Glassmorphism design system
- **Animations**: Framer Motion & Canvas Confetti
- **Icons**: Lucide React
- **Charts**: Recharts
- **Real-Time Communication**: Socket.io-client

### Backend
- **Runtime**: Node.js & Express
- **Real-Time Communication**: Socket.IO
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) & BcryptJS
- **Dev Tools**: Nodemon

---

## 📁 Project Structure

```text
food-app/
├── backend/                  # Express API Server & Socket.IO
│   ├── src/
│   │   ├── config/          # Database configuration (MongoDB)
│   │   ├── controllers/     # Route handlers (Auth, Food, Orders, AI, etc.)
│   │   ├── data/            # Mock dataset & seed data
│   │   ├── routes/          # Express API route endpoints
│   │   └── server.js        # Entry point for backend server & sockets
│   └── package.json
│
├── frontend/                 # React + Vite Client Application
│   ├── public/              # Static assets & icons
│   ├── src/
│   │   ├── components/      # UI Modals, Cards, Navbars, Drawers
│   │   ├── context/         # Auth, Cart, Theme & Wishlist contexts
│   │   ├── data/            # Local data models & fallback datasets
│   │   ├── pages/           # Customer, Restaurant, Delivery & Admin views
│   │   ├── services/        # Axios API integration layer
│   │   ├── App.jsx          # Root application component & role router
│   │   └── main.jsx         # React DOM entry point
│   └── package.json
│
├── .gitignore                # Global git ignore file
└── README.md                 # Project documentation
```

---

## 🚀 How to Start the Project

Follow these simple steps to set up and run Mealora locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (installed automatically with Node.js)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI - *optional if using fallback mock data*)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/Shar236/food-app.git
cd food-app
```

---

### Step 2: Set Up and Start the Backend Server

1. Open a terminal window and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. *(Optional)* Create a `.env` file inside the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mealora
   JWT_SECRET=your_secret_key_here
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   > 🚀 The backend will start on **`http://localhost:5000`** with Socket.IO initialized.

---

### Step 3: Set Up and Start the Frontend Client

1. Open a new terminal window and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL displayed in terminal (typically **`http://localhost:5173`** or **`http://localhost:3000`**).

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend status & health check |
| `GET` | `/api/foods` | Fetch all food items |
| `GET` | `/api/restaurants` | Fetch restaurant directory |
| `GET` | `/api/categories` | Fetch food categories |
| `POST` | `/api/orders` | Place a new order |
| `GET` | `/api/orders/:id` | Fetch order details & tracking status |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the ISC License.

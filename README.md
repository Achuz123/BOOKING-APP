
# 🎬 Movie Ticket Booking App

A full-stack web application where users can book movie tickets online. It includes user authentication, theater management, show management, online payment using Stripe, and seat selection with real-time booking updates.

---

## 🧠 **Tech Stack**

- **Frontend:** React.js, Redux, Tailwind CSS, Ant Design
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Payments:** Stripe
- **Authentication:** JWT (JSON Web Token)

---

## 🌟 **Features**

- ✅ User Authentication (Login, Register)
- ✅ Movie Listing
- ✅ Theatre and Show Management (for Admins)
- ✅ Seat Selection with Real-time Availability
- ✅ Payment Gateway Integration using Stripe
- ✅ Booking History & Booking Details
- ✅ Responsive UI

---

## 🔧 **Installation Guide (Step-by-Step)**

### ✅ Prerequisites

- Node.js & npm ➝ [Download Node.js](https://nodejs.org/)
- MongoDB (Local or Atlas) ➝ [Get MongoDB](https://www.mongodb.com/)
- Stripe Account ➝ [Register on Stripe](https://dashboard.stripe.com/register)
- Git ➝ [Download Git](https://git-scm.com/)

---

### 🚀 **Steps to Run Locally**

### 🔗 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 📦 2. Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

---

### ⚙️ 3. Create Environment Variables

Create a file named `.env` in the **backend** folder.

```env
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
STRIPE_KEY=your_stripe_secret_key
```

Example:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/databasename
SECRET_KEY=yourSecretKey
STRIPE_KEY=sk_test_***************
```

---

### ▶️ 4. Run Backend Server

```bash
cd backend
npm start
```

The backend will start at:

```
http://localhost:5003
```

---

### 💻 5. Run Frontend App

```bash
cd frontend
npm start
```

The frontend will start at:

```
http://localhost:3000
```

---

## ✅ **Usage**

- ➕ Register an account or login
- 🎥 Browse movies
- 🎟️ Select a show and choose seats
- 💳 Complete payment via Stripe
- 📃 View your booking details in the profile section

---




## 🙌 **Support**

If you like this project, ⭐️ star it on GitHub and share it with others!

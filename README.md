# 🏋️ Gym Management Platform

A full-stack gym management web application built with modern technologies.  
This platform allows users to manage their fitness journey, while admins can efficiently handle gym operations.

---

## 🚀 Tech Stack

### Frontend & Admin Panel
- Next.js
- shadcn/ui
- Axios

### Backend
- Node.js
- Express.js (REST API)

### Database
- MongoDB

---

## ✨ Features

### 👤 User Features
- User authentication (login/signup)
- Browse gym plans and subscriptions
- Purchase gym-related products
- View coaches and available classes
- Access personalized exercise routines
- Submit feedback

---

### 🛠️ Admin Panel Features
- Manage users (view, update)
- Add and manage subscription plans
- Manage staff and coaches
- Monitor user activity
- Handle feedback

---

## 📁 Project Structure

gym-website/
│
├── frontend/ # User-facing application
├── admin/ # Admin dashboard
├── backend/ # REST API server
│
├── README.md
└── .gitignore

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
git clone https://github.com/Meenesh-Sharma/Gym-Website-

cd gym-website
2️⃣ Setup Backend
cd backend
npm install
npm run dev

### 3️⃣ Setup Frontend
cd frontend
npm install
npm run dev


### 4️⃣ Setup Admin Panel
cd adminpanel
npm install
npm run dev

## 🔐 Environment Variables
Create a `.env` file in the backend folder and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ALLOWED_ORIGINS=http://localhost:3512,http://localhost:3560


Create a `.env.local` file in the frontned and adminpanel folder and add:
NEXT_PUBLIC_API_URL=http://localhost:5400/api



## 🎨 shadcn/ui Setup
npx shadcn-ui@latest init
npx shadcn@latest add button textarea tabs sheet separator input label dropdown-menu dialog card badge avatar alert-dialog checkbox

👉 Run the above commands in both:
- `frontend`
- `admin`


## 📡 API Communication

- Axios is used for API calls between frontend/admin and backend
- REST APIs handle authentication, users, plans, and gym data

---

## 🧠 Learning Outcomes

- Built scalable full-stack architecture
- Implemented RESTful APIs
- Designed reusable UI components
- Managed authentication and state
- Used AI tools to improve development speed and code quality

---

## 🔗 GitHub Repository

👉 Add your repo link here

---

## 📌 Future Improvements

- Payment gateway integration
- Real-time notifications
- Mobile responsiveness improvements
- Advanced analytics dashboard

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📬 Feedback

If you have any suggestions or feedback, feel free to reach out!

---

⭐ If you like this project, don’t forget to star the repository!
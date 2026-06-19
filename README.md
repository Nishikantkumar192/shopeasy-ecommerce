# 🛒 E-commerce Website (Wedding Accessories & General Merchandise)

## 🚀 Overview
This project is an e-commerce platform focused on wedding accessories and general merchandise.  
Users can browse products, sign up/login, and interact with the platform.

I recently implemented the **backend payment logic using Razorpay** to understand how real-world payment systems work.

---

## 💳 Payment Integration (Razorpay)

### 🔹 What I implemented (Backend)
- Created orders using Razorpay API  
- Sent `order_id` from backend to frontend  
- Implemented payment verification using signature validation  
- Confirmed payment securely after verification  

> ⚠️ Note: Frontend Razorpay checkout integration is not implemented yet.

---

## 🔄 Payment Flow

1. User initiates payment  
2. Frontend requests backend to create order  
3. Backend creates order using Razorpay  
4. Razorpay returns `order_id`  
5. Frontend receives order_id (checkout integration pending)  
6. Backend verifies payment using signature  
7. Payment is confirmed securely  

---

## 🔐 Authentication
- User Signup  
- User Login  
- Session/Auth handling implemented  

---

## 📦 Order Management

- Users can hide/remove order history from their account view
- Order data remains preserved in the database
- Order visibility managed separately for users

## 🛠️ Tech Stack

- **Frontend:** React.js (Deployed on Vercel)  
- **Backend:** Node.js, Express.js (Deployed on Render)  
- **Database:** MongoDB  
- **Payment Gateway:** Razorpay  

---

## 🔐 Security Practices

- Sensitive keys stored in `.env` file  
- Payment verification using Razorpay signature  
- Backend-controlled payment validation  

---

### 🔹 Additional Backend Features

- Implemented order history management
- Added user-side order history removal (without deleting records from the database)
- Implemented bulk product deletion functionality for admins

## 📌 Current Status

- ✅ Order management system implemented
- ✅ User order history management
- ✅ Users can hide/remove order history from their account view
- ✅ Bulk product deletion for admins

## 📚 Learnings

- How payment gateways like Razorpay handle transactions
- Backend order creation and payment verification
- Importance of secure payment validation
- Designing an order management system
- Managing user-specific order history visibility
- Performing bulk database operations in MongoDB
- Building and deploying a full-stack MERN application

## 🚧 Future Improvements

- Add refund & cancellation flow  
- Add admin dashboard for order analytics
- Implement inventory management
- Improve UI/UX  

---
## 🌐 Live Demo
Frontend: https://shopeasy-ecommerce-ubgf.vercel.app
Backend: https://shopeasy-backend-1f5k.onrender.com

## 👨‍💻 Author

- Nishi kant kumar
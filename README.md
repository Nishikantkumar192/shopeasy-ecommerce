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

## 📌 Current Status

- ✅ Authentication system (Login/Signup)  
- ✅ Backend payment logic implemented  
- ⏳ Frontend payment integration pending  
- ⏳ Order management system not implemented  

---

## 📚 Learnings

- How payment gateways like Razorpay handle transactions  
- Backend order creation and verification  
- Importance of secure payment handling  
- Real-world flow behind a “Pay” button  

---

## 🚧 Future Improvements

- Complete frontend Razorpay checkout integration  
- Implement order management system  
- Add order history for users  
- Improve UI/UX  
- Add refund & cancellation flow  

---
## 🌐 Live Demo
Frontend: https://shopeasy-ecommerce-ubgf.vercel.app
Backend: https://shopeasy-backend-1f5k.onrender.com

## 👨‍💻 Author

- Nishi kant kumar
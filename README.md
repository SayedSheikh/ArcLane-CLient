# Arclane 🏢 – Building Management Web App

Arclane is a feature-rich building management system built with **React**, **Firebase**, **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS** (with **Flowbite**). It offers role-based dashboards and functionality for Admins, Members, and Users — managing apartments, payments, announcements, users, and much more.

🌐 **Live Site**: [https://arclane.web.app](https://arclane.web.app)

---

## ✨ Features

- 🔐 JWT-based authentication (fully secured routes)
- 🧑‍💼 Role-based dashboards: Admin | Member | User
- 💳 Stripe payment integration for monthly rent
- 📣 Admin announcement system
- 📅 Dynamic rent due checker with popup reminder
- 🧾 Admin payment history chart with `Recharts`
- 🎯 Coupons system (admin can manage status)
- 👥 Admin can remove members
- 📍 Interactive map using `React Leaflet`
- 📬 Email sending using `EmailJS`
- 📊 Beautiful pie charts for user & room data
- 🚪 Room availability status: available, pending, booked
- 🔐 Axios interceptor integration for secure requests
- 🌍 Responsive & modern UI with Tailwind CSS + **Flowbite**

---

## 📁 Tech Stack

| Frontend            | Backend    | Tools / Packages               |
| ------------------- | ---------- | ------------------------------ |
| React 19            | Node.js    | Axios / Axios Interceptor      |
| React Router 7      | Express.js | TanStack React Query           |
| Firebase Auth       | MongoDB    | JWT Auth & Verification        |
| Tailwind CSS 4      |            | Flowbite                       |
| Flowbite Components |            | Recharts, AOS, EmailJS, Stripe |
| React Hook Form     |            | React Spinners, SweetAlert2    |

---

## ⚙️ Installation & Setup

### 🔄 Clone the Repository

```bash
git clone https://github.com/SayedSheikh/arclane.git
cd arclane
```

### 📦 Install Dependencies

```bash
npm install
```

### 🧪 Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PK=your_stripe_publishable_key
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

> ⚠️ Don't commit `.env` to your repo!

### ▶️ Run the App

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Authentication & Access Control

- **Firebase** handles authentication
- **JWT tokens** are issued from the backend and stored in local storage
- **Axios Interceptors** attach JWT tokens to every secure request
- **Private Route Guards** protect sensitive routes based on user roles
- Admin, Member, and User dashboards are completely separate

---

## 🧠 Admin Capabilities

- View admin dashboard with statistics
- See pie charts for:

  - Member vs Normal Users
  - Room status (Available, Pending, Booked)

- Add & manage announcements
- View and manage all users

  - Remove members

- Create, update coupon codes

  - Toggle active/inactive status

- View payment history
- View & manage apartments

---

## 💡 Member Features

- View personalized dashboard
- Make rent payments via Stripe
- Get notified of due rents
- Access payment history
- Receive announcements

---

## 🌱 User Features

- Browse available apartments
- Apply to become a member
- View announcements

---

## 📌 Extra Features

- Lottie animations used for loading and empty states
- Beautiful toast notifications with `SweetAlert2`
- Responsive layout with **Flowbite** components
- Custom hooks for role checks and secure Axios
- AOS animations for enhanced UI experience

---

Feel free to ⭐️ the repo if you found it helpful!

---

✅ Let me know if you want:

- Backend `README.md`
- `.env.example` template
- Deployment guide (e.g. Firebase + Vercel combo)

I can generate that too!

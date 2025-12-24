# SATVertex Frontend

SATVertex Frontend is the production-ready admin interface for **SATVertex**, a real-time collaborative workspace platform.  
It is built with **React + Vite**, styled with **Tailwind CSS**, and connected to the SATVertex **Node.js** backend for **JWT-based authentication**, admin dashboards, and CMS-style management of users and workspaces.

---

## Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **HTTP Client:** Axios
- **Auth:** JWT (via SATVertex Node.js backend)
- **Build Tool:** Vite

---

## Features

- Admin login connected to backend (`/api/auth/login`) using JWT.
- Protected admin routes (redirect to login if not authenticated).
- Admin dashboard layout:
  - Sidebar navigation.
  - Top header with admin info and logout.
  - Overview cards for users, workspaces, and sessions (API-ready).
- Clean project structure ready for CMS-like sections:
  - Users management.
  - Workspaces management.
  - Activity / logs pages.

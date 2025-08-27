# Parcel Delivery System
 
 _________________________________________ParcelFlux___________________________________________

## Project Overview
This is a full-stack parcel delivery management system. Users can create, track, and manage parcels. Admins can manage users and parcels with a dashboard showing detailed statistics. The system supports role-based access (Admin, Sender, Receiver) and real-time parcel status updates.

Key features:
- User registration and login (Admin, Sender, Receiver)
- Parcel creation, tracking, and status updates
- Admin dashboard with statistics
- Role-based access control
- Parcel search, filter, and pagination
- Responsive UI for mobile, tablet, and desktop
- Validation with React Hook Form + Yup
- Loading spinners and skeletons for better UX

## Technology Stack
**Frontend:**
- React.js + TypeScript
- Redux Toolkit + RTK Query
- React Hook Form + Yup for validation
- Tailwind CSS for styling
- react-hot-toast for notifications
- React Router for routing

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- CORS configuration for cross-origin requests
- Deployed on [Vercel](https://parcel-delivery-api-ashy.vercel.app)

**Deployment:**
- Frontend hosted on [Surge](https://parcelfluxzidanassignment6.surge.sh)
- Backend hosted on [Vercel](https://parcel-delivery-api-ashy.vercel.app)

## Setup Instructions

### Backend
1. Clone the backend repository:
   ```bash
   git clone "https://github.com/zidan71/b5A5-backend"
   cd b5A5-backend  
2. npm install
3. npm run dev

### Frontend

1. git clone "https://github.com/zidan71/b5A5-frontend"
   cd b5A5-frontend

2. npm install
3. set environment variable in .env
   VITE_API_URL=https://parcel-delivery-api-ashy.vercel.app/api
4. npm run dev
   

   Frontend: https://parcelfluxzidanassignment6.surge.sh

   Backend: https://parcel-delivery-api-ashy.vercel.app


### Notes

. Ensure both frontend and backend use HTTPS in production to avoid CORS/mixed content issues.

. Use valid JWT tokens for authenticated requests.

. For any issues with parcel creation or status updates, check the browser console for detailed errors.

. Pagination and search filters are supported in the “My Parcels” table for better management of large datasets.

# Frontend-Backend Integration

## Setup Instructions

1. **Start Backend Server:**
   ```bash
   cd "day 11"
   npm install
   npm start
   ```
   Or use: `start-backend.bat`

2. **Start Frontend:**
   ```bash
   npm install
   npm run dev
   ```

## What's Integrated

### Authentication
- Login/signup now uses backend API (`/api/auth/login`, `/api/auth/register`)
- Token verification with backend (`/api/auth/verify`)
- JWT tokens stored in localStorage

### Data Management
- **Leads**: Full CRUD operations via `/api/leads`
- **Contacts**: Full CRUD operations via `/api/contacts`
- **Deals**: Full CRUD operations via `/api/deals`
- **Tasks**: Full CRUD operations via `/api/tasks`
- **Tickets**: Full CRUD operations via `/api/tickets`

### React Query Hooks
- `useLeads`, `useContacts`, `useDeals`, `useTasks`, `useTickets`
- Automatic caching and refetching
- Loading and error states

## Backend Requirements
- MongoDB connection
- Environment variables in `day 11/.env`
- Backend server running on `localhost:5000`

## Next Steps
- Update remaining components to use API hooks
- Add form submissions with mutations
- Implement real-time updates
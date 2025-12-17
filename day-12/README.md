# Day 12 - Mini CRM with JWT Authentication

A complete CRM application with secure JWT authentication, role-based authorization, and modern UI.

## Features

### Authentication & Security
- JWT token-based authentication
- Password encryption with SHA256
- Role-based authorization (Admin/User)
- Secure login/signup with validation
- Token expiration handling
- Demo accounts for testing

### User Interface
- Colorful gradient backgrounds with animations
- Professional design with modern color palette (#034C53, #007074, #F38C79, #FFC1B4)
- Responsive design with glassmorphism effects
- Animated floating elements
- Dark theme toggle support
- Role-based navigation and features

### CRM Features
- Dashboard with analytics and charts
- Lead management system
- Contact management
- Task tracking
- Deal pipeline visualization
- User profile management
- Admin panel for user management
- Advanced analytics with team performance

### Role-Based Access
**Admin Access:**
- Full dashboard with all metrics
- User management
- System settings
- Security settings
- Billing management
- Advanced analytics
- All CRM features

**User Access:**
- Basic dashboard
- Lead management
- Contact management
- Task management
- Deal tracking
- Profile settings
- Notifications

## Demo Accounts
- **Admin**: admin@demo.com / admin123
- **User**: user@demo.com / user123

## Tech Stack
- React 18 with Vite
- Tailwind CSS for styling
- Zustand for state management
- React Router for navigation
- Recharts for data visualization
- Lucide React for icons
- Crypto-JS for encryption
- JWT for authentication

## Setup Instructions

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Security Features
- Password hashing with secret key
- JWT token generation and verification
- Token expiration validation
- Role-based route protection
- Secure local storage handling

## Color Palette
- Primary: #034C53 (Dark Teal)
- Secondary: #007074 (Medium Teal)
- Accent: #F38C79 (Coral)
- Light: #FFC1B4 (Light Peach)
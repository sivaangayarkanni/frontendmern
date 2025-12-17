import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = process.env.JWT_SECRET || 'crm-secret-key'
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crm-database'

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    console.log('Database:', mongoose.connection.db.databaseName)
  })
  .catch(err => console.log('MongoDB error:', err))

// Middleware
app.use(cors())
app.use(express.json())

// In-memory storage (temporary)
let users = []
let leads = []
let contacts = []
let deals = []
let tasks = []
let tickets = []

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access token required' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })
    req.user = user
    next()
  })
}

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    }

    users.push(user)
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' })
    console.log('Token generated for registration:', token)

    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = users.find(u => u.email === email)

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' })
    console.log('Token generated for login:', token)

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  })
})

// Leads routes
app.get('/api/leads', authenticateToken, (req, res) => {
  res.json(leads)
})

app.post('/api/leads', authenticateToken, (req, res) => {
  const lead = { _id: Date.now(), ...req.body, createdAt: new Date() }
  leads.push(lead)
  res.status(201).json(lead)
})

// Contacts routes
app.get('/api/contacts', authenticateToken, (req, res) => {
  res.json(contacts)
})

app.post('/api/contacts', authenticateToken, (req, res) => {
  const contact = { _id: Date.now(), ...req.body, createdAt: new Date() }
  contacts.push(contact)
  res.status(201).json(contact)
})

// Deals routes
app.get('/api/deals', authenticateToken, (req, res) => {
  res.json(deals)
})

app.post('/api/deals', authenticateToken, (req, res) => {
  const deal = { _id: Date.now(), ...req.body, createdAt: new Date() }
  deals.push(deal)
  res.status(201).json(deal)
})

// Tasks routes
app.get('/api/tasks', authenticateToken, (req, res) => {
  res.json(tasks)
})

app.post('/api/tasks', authenticateToken, (req, res) => {
  const task = { _id: Date.now(), ...req.body, createdAt: new Date() }
  tasks.push(task)
  res.status(201).json(task)
})

// Tickets routes
app.get('/api/tickets', authenticateToken, (req, res) => {
  res.json(tickets)
})

app.post('/api/tickets', authenticateToken, (req, res) => {
  const ticket = { _id: Date.now(), ...req.body, createdAt: new Date() }
  tickets.push(ticket)
  res.status(201).json(ticket)
})

app.get('/', (req, res) => {
  res.json({ message: 'CRM Backend API Running' })
})

app.get('/api/debug', (req, res) => {
  res.json({
    database: mongoose.connection.db.databaseName,
    collections: mongoose.connection.db.listCollections().toArray(),
    users: users.length,
    leads: leads.length
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
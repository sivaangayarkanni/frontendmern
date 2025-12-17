require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const contactRoutes = require('./routes/contacts');
app.use('/api/contacts', contactRoutes);

const dealRoutes = require('./routes/deals');
app.use('/api/deals', dealRoutes);

const leadRoutes = require('./routes/leads');
app.use('/api/leads', leadRoutes);

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'CRM Backend API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
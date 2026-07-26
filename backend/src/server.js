const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Attach io instance to request context
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.IO event listeners
io.on('connection', (socket) => {
  console.log(`[Socket.IO Connected]: Client ${socket.id}`);

  socket.on('joinOrderTrack', (orderId) => {
    socket.join(`order_${orderId}`);
    console.log(`Socket ${socket.id} joined tracking room order_${orderId}`);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.IO Disconnected]: Client ${socket.id}`);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Mealora Backend API',
    tagline: 'Food that Matches Your Moment.',
    timestamp: new Date().toISOString(),
  });
});

// Register API Routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

// Connect Database & Start Server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`
==================================================
  🍱 MEALORA FULL-STACK BACKEND SERVER READY 🚀
  Tagline: "Food that Matches Your Moment."
  URL: http://localhost:${PORT}
  Socket.IO: Enabled
==================================================
    `);
  });
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import MongoDBConnection from './db';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import groupRoutes from './routes/group';
import groupMemberRoutes from './routes/groupMember';
import messageRoutes from './routes/message';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Initialize the MongoDB connection
const dbConnection = new MongoDBConnection();
// Access the MongoDB connection
dbConnection.getConnection();

// Middleware
app.use(cors());
app.use(express.json());

// Global error handler middleware
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Log the error
  // eslint-disable-next-line no-console
  console.error(err.stack);
  // Check if the error is a known type (e.g., validation error)
  if (err.name === 'ValidationError') {
    // Respond with a 400 Bad Request status code and a custom error message
    return res.status(400).json({ error: err.message });
  }
  // For other types of errors, respond with a generic 500 Internal Server Error status code
  res.status(500).json({ error: 'Internal Server Error' });
}

// Add the global error handler middleware to the Express app
app.use(errorHandler);

// Routes
app.get('/', (req, res) => {
  res.send('Application starts !!!');
});
app.use('/api/v1/', authRoutes);
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', groupRoutes);
app.use('/api/v1/', groupMemberRoutes);
app.use('/api/v1/', messageRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});

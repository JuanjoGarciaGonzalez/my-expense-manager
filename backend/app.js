// Import the express module
const express = require('express');
const cors = require('cors');

// Connect to the database
require('./config/database');

const userRoutes = require('./routes/UserRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:5173'
  }));

app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
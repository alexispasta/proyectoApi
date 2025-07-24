const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userRoutes = require('./routes/user');
const User = require('./models/User');

const app = express(); // ⚠️ esto debe ir antes que cualquier uso de `app`
const PORT = 3000;

// Middleware
app.use(cors());               // ⚠️ ahora CORS funciona correctamente
app.use(cors({
  origin: 'http://127.0.0.1:5500', // o el puerto donde estás sirviendo tu HTML
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());       // Habilita JSON en body

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/proyecto_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conexión a MongoDB exitosa'))
.catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas
app.use('/api', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ Servidor funcionando correctamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});


const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username y password son obligatorios' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: '✅ Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', detail: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username y password son obligatorios' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    res.status(200).json({ message: '✅ Autenticación exitosa' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor', detail: error.message });
  }
});

// Obtener todos los usuarios (sin contraseñas)
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.find({}, '-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios', detail: error.message });
  }
});

module.exports = router;

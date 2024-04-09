// backend/routes/mahasiswa.js

const express = require('express');
const router = express.Router();
const Mahasiswa = require('../models/mahasiswa');

// Handle GET request to retrieve IPK
router.get('/:nim/ipk', async (req, res) => {
  const { nim } = req.params;

  try {
    const ipk = await Mahasiswa.calculateIPK(nim);
    res.status(200).json({ nim, ipk });
  } catch (error) {
    res.status(404).json({ message: 'NIM yang dimasukkan salah' });
  }
});

module.exports = router;

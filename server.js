const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parsing JSON pada request body
app.use(express.json());

// Data dummy Project 1
let data = [
  { id: 1, title: 'Produk Kami', content: 'AI canggih untuk analisis data.' },
  { id: 2, title: 'Tim Kami', content: 'Ahli-ahli berpengalaman.' },
  { id: 3, title: 'Kontak', content: 'info@techinovasi.com' }
];

// GET: Ambil semua data
app.get('/api/data', (req, res) => {
  res.json(data);
});

// POST: Tambah data baru
app.post('/api/data', (req, res) => {
  console.log('POST Body:', req.body);
  if (!req.body || !req.body.title || !req.body.content) {
    return res.status(400).json({ error: 'Title dan content wajib diisi' });
  }
  const newItem = {
    id: data.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT: Update data berdasarkan ID
app.put('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Data tidak ditemukan' });
  }
  if (!req.body.title && !req.body.content) {
    return res.status(400).json({ error: 'Harus ada data untuk diupdate' });
  }
  data[index] = { ...data[index], ...req.body };
  res.json(data[index]);
});

// DELETE: Hapus data berdasarkan ID
app.delete('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Data tidak ditemukan' });
  }
  data.splice(index, 1);
  res.json({ message: 'Data berhasil dihapus' });
});

// Jalankan server
app.listen(port, () => {
  console.log(`API berjalan di http://localhost:${port}`);
});

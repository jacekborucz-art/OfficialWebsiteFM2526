import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static('dist'));

// API endpoint to get news
app.get('/api/news', (req, res) => {
  try {
    const newsPath = path.join(__dirname, 'src', 'data', 'news.json');
    const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read news' });
  }
});

// API endpoint to save news
app.post('/api/news', (req, res) => {
  try {
    const newsPath = path.join(__dirname, 'src', 'data', 'news.json');
    fs.writeFileSync(newsPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'News saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save news' });
  }
});

// Admin panel route - redirect to hash route
app.get('/admin', (req, res) => {
  res.redirect('/#/admin');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});

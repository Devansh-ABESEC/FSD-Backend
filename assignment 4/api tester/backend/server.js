import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({
    message: 'Hello! GET request received successfully.'
  });
});

app.post('/api/test', (req, res) => {
  res.json({
    message: 'POST request received successfully!',
    receivedData: req.body
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors' 
import db from './database.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res)=>{
  res.send("server is working fine")
})

app.post('/api/qrcodes', (req, res) => {
  const { content } = req.body;

  const sql = 'INSERT INTO qrcodes (content) VALUES (?)';
  db.query(sql, [content], (err, result) => {
    if (err) {
      console.error('Error saving QR code:', err);
      res.status(500).json({ error: 'Error saving QR code' });
    } else {
      res.status(200).json({ message: 'QR code saved successfully' });
    }
  });
});

app.get('/api/qrcodes', (req, res) => {
  const sql = 'SELECT * FROM qrcodes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving QR codes:', err);
      res.status(500).json({ error: 'Error retrieving QR codes' });
    } else {
      res.status(200).json(results);
    }
  });
});



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

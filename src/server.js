import express from 'express';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(8001, () => {
  console.log('Server is running on port 8001');
});
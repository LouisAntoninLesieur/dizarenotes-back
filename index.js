import 'dotenv/config';
import express from 'express';
import router from './src/routers/index.router.js'
import cors from 'cors';

export const app = express();

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
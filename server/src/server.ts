import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.log('Server started');
  res.send('Wello world');
});

app.listen(3333);
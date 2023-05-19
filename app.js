const express = require('express');
const app = express();

const { findHighestOdd } = require('./src/comparison/compare.js');

app.get('/', async (req, res) => {
    let a = await findHighestOdd();
    res.json(a);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
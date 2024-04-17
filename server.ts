const express = require('express');
const app = express()
const port = 3000
const fs = require('fs');

const json = fs.readFileSync('./response.json', 'utf-8');

app.get('/', (req, res) => {
  res.send(json);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
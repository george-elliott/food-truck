import express, { Express, Request, Response } from "express";
const app: Express = express()
const port = 3000
const fs = require('fs');

const json = fs.readFileSync('./response.json', 'utf-8');

app.get('/', (req: Request, res: Response) => {
  res.send(json);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
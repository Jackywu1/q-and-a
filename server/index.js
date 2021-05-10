const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/qa/questions', (req, res) => {
  console.log(req.params);
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

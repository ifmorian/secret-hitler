const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

app.get('/join', (req, res) => {
  req.body;
  res.json(req.body);
  console.log(req.query.test)
});

app.listen(port, () => {
  console.log('App is running on port ' + port)
})
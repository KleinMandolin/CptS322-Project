const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


app.use(cors());
app.use(bodyParser.json());

// Hard-coded credentials
const hardCodedUsername = 'admin';
const hardCodedPassword = 'passwordhaha';


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === hardCodedUsername && password === hardCodedPassword) {
    res.send({ message: 'Login successful', user: { username } });
  } else {
    res.send({ message: 'Invalid credentials' });
  }
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

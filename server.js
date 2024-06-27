const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + '/public/index.html');
  } else {
    res.redirect('/login');
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'safaa@gmail.com' && password === '12') {
    req.session.loggedIn = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
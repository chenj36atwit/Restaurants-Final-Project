const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/burger/:name', (req, res) => {
  const name = req.params.name;
  res.send(`You selected the ${name} burger! A true McClassic.`);
});

app.get('/greet', (req, res) => {
  const name = req.query.name || 'guest';
  res.send(`Hi, ${name}! Welcome back to KeepGoingMcDonald! We're glad to see you again!`);
});

app.get('/meal/:burger/:drink', (req, res) => {
  const { burger, drink } = req.params;
  res.send(`Your meal combo: ${burger} burger with a ${drink}!`);
});

app.get('/feedback', (req, res) => {
  const { item, rating } = req.query;
  if (!item || !rating) {
    return res.send("Please include both 'item' and 'rating' in your feedback.");
  }
  res.send(`Thanks for rating the ${item} with a ${rating}/5!`);
});

app.get('/info/:section', (req, res) => {
  const section = req.params.section.toLowerCase();
  const info = {
    about: ">Welcome to <strong>KeepGoingMcDonald!</strong> — We believe that some McDonald's menu items were too good to be discontinued. Our mission is to recreate these lost classics and give food lovers a chance to taste nostalgia..",
    menu: "Includes Hula Burger, Arch Deluxe, McSalad Shakers, and more!",
    contact: "Email us at customer@keepgoingmcdonald.com",
  };

  res.send(info[section] || "Sorry, no information available for that section.");
});

app.listen(port, () => {
  console.log(`KeepGoingMcDonald! running at http://localhost:${port}`);
});

// Add these routes to your existing app.js
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/create-account', (req, res) => {
  res.sendFile(__dirname + '/public/create-account.html');
});

// Handle login form submission
app.post('/login', express.urlencoded({ extended: true }), (req, res) => {
  const { email, password } = req.body;
  
  // Simple validation (in real app, check against database)
  if (email === 'admin@keepgoingmcdonald.com' && password === 'password123') {
    res.send(`
      <script>
        alert('Login successful!');
        window.location.href = '/';
      </script>
    `);
  } else {
    res.send(`
      <script>
        alert('Invalid credentials');
        window.location.href = '/login';
      </script>
    `);
  }
});

// Handle create account form submission
app.post('/create-account', express.urlencoded({ extended: true }), (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  // Simple validation
  if (firstName && lastName && email && password) {
    res.send(`
      <script>
        alert('Account created successfully!');
        window.location.href = '/login';
      </script>
    `);
  } else {
    res.send(`
      <script>
        alert('Please fill in all required fields');
        window.location.href = '/create-account';
      </script>
    `);
  }
});
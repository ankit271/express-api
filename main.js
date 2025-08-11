const express = require('express')
const app = express();
app.use(express.json());
const PORT = 4000

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 28,
    email: "alice.johnson@example.com",
    city: "New York"
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 34,
    email: "bob.smith@example.com",
    city: "Los Angeles"
  },
  {
    id: 3,
    name: "Charlie Brown",
    age: 22,
    email: "charlie.brown@example.com",
    city: "Chicago"
  },
  {
    id: 4,
    name: "Diana Prince",
    age: 31,
    email: "diana.prince@example.com",
    city: "San Francisco"
  },
  {
    id: 5,
    name: "Ethan Hunt",
    age: 40,
    email: "ethan.hunt@example.com",
    city: "Miami"
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    age: 27,
    email: "fiona.gallagher@example.com",
    city: "Boston"
  },
  {
    id: 7,
    name: "George Martin",
    age: 36,
    email: "george.martin@example.com",
    city: "Seattle"
  },
  {
    id: 8,
    name: "Hannah Lee",
    age: 30,
    email: "hannah.lee@example.com",
    city: "Austin"
  },
  {
    id: 9,
    name: "Ian Wright",
    age: 25,
    email: "ian.wright@example.com",
    city: "Denver"
  },
  {
    id: 10,
    name: "Julia Roberts",
    age: 38,
    email: "julia.roberts@example.com",
    city: "Atlanta"
  }
];

app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
})

app.get('/users', (req, res) =>{
    res.json({ "users": users });
})

app.get('/user/:id', (req, res) => {
    const userId = req.params.id; 
    const user = users.find(u => u.id == userId); 

    if (user) {
        res.json({ user });
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/user', (req, res) => {
    
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        email: req.body.email,
        city: req.body.city
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

app.delete('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);  

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send(); // 204: No Content
    } else {
        res.status(404).send('User not found');
    }
});


app.get('/search', (req, res) => {
  const { name, age } = req.query;
  res.send(`Search results for: Name=${name}, Age=${age}`);
});

// GET http://localhost:3000/search?name=Alice&age=25
// GET http://localhost:3000/users/45/details?includePosts=true

app.get('/users/:id/details', (req, res) => {
  const { id } = req.params;
  const { includePosts } = req.query;

  res.send(`User ID: ${id}, Include Posts: ${includePosts}`);
});


app.get('/home', async (req, res) =>{

    const url = 'https://dummyjson.com/users'

    const response = await fetch(url);
    const data = await response.json();

    res.send(data.users);
})

app.listen(PORT, () =>{
    console.log(`Server is running http://localhost:${PORT}`);
})
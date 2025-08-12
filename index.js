const express = require('express')
const path = require('path');
const app = express();
app.use(express.json());
const PORT = 4000
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

const users = [  
  {
    id: 101,
    name : 'Ankita Mishra',
    email: 'ankita@gmail.com',
    city: 'Nagpur',
  }
]

app.get('/', (req, res) => {
    res.send('Welcome to the User Management');
})

app.get('/users', (req, res) =>{  
  res.render('index', {title : "User List", users : users} );
})

app.post('/user', (req, res) =>{
try {
  
    const { name, email, city } = req.body;
    const id = users.length + 101

    users.push({id, name, email, city});
    
    res.status(201).json({ "message": "user created successfully"})

} catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
})

app.get('/user/:id', (req, res) =>{
  const userId = req.params.id
  const user = users.find(user => user.id == userId)
  
  res.status(200).json({"user": user});
})

app.put('/user/:id', (req, res) =>{
  try {
      
    const userId = req.params.id
      const { name, email, city } = req.body;
      const userIndex = users.findIndex(user => user.id == userId)
      
      if(userIndex == -1){
        return res.status(404).json({"message": "User not found"});
      }

      if(userIndex != -1){
        users[userIndex] = {id: userId, name, email, city}  
      }
      res.status(200).json({"message": "  User updated successfully", "user": users[userIndex]});

  } catch (error) {
     res.status(500).json({message: "Internal Server Error"});
  }
})

app.delete('/user/:id', (req, res) =>{
  try {
      const userId = req.params.id
      const userIndex = users.findIndex(user => user.id == userId)
      
      if(userIndex == -1){
        return res.status(404).json({"message": "User not found"});
      }

      if(userIndex != -1){
        users.splice(userIndex, 1) 
        res.status(200).json({"message": "  User deleted successfully"});
      }
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
})

app.get('/search', (req, res) =>{

  const {name, city} = req.query;

  const filterUser = users.filter(user => {

     if( user.name.toLowerCase().includes(name.toLowerCase()) 
        || user.city.toLowerCase() == city.toLocaleLowerCase()){
        return user;
     }
  })

  if(filterUser.length > 0){
    res.status(200).json({"users": filterUser});
  } else {
    res.status(404).json({"message": "No users found"});
  }
})


app.listen(PORT, () =>{
    console.log(`Server is running http://localhost:${PORT}`);
})
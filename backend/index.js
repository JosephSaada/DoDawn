const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/DoDawn', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', userSchema);

const taskSchema = new mongoose.Schema({
  description: String,
  assignee: String,
  priority: String,
  status: String,
  userId: mongoose.Schema.Types.ObjectId
});

const Task = mongoose.model('Task', taskSchema);


// This API endpoint handles user login by receiving login credentials through a POST request to /login
app.post('/login', async (req, res) => {

 // retrieves the user from the database using the provided email, and checks if the user exists
  try {
    //It logs the received data for debuggin
    const { email, password } = req.body;
     // retrieves the user from the database using the provided email
    
     console.log("Login endpoint received data:", { email, password }); // Debug log
   
     const user = await User.findOne({ email });
    //Checking if user does not exists \
     if (!user) {return res.status(400).json({ message: 'User not found' });}
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {

      //checikng if it is invalid password
      return res.status(400).json({ message: 'Invalid password' });

    }
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error("Error during login:", error); // Debug log
    res.status(500).json({ error: error.message });
  }
});

// Register endpoint
//This API endpoint handles user registration by receiving user details 
//through a POST request to /register.
// It logs the received data for debugging, hashes the user's password using bcrypt,
// and creates a new user object. 
//The new user is then saved to the database, and upon success, 
//a 201 status code with a success message is returned.
// If an error occurs, it logs the error and returns a 400 status code
app.post('/register', async (req, res) => {

  //This API endpoint handles user registration by receiving user details 
  try {

    const { name, email, password } = req.body;

    console.log("Register endpoint received data:", { name, email, password }); 
    
    //hashes the user's password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    //Good request
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {

    console.error("Error during registration:", error); 

    res.status(400).json({ error: error.message });
  }
});

//This api add a new task to the database
app.post('/tasks', async (req, res) => {
  try {

    //Processing 
    const { description, assignee, priority, status, userId } = req.body;
    const newTask = new Task({ description, assignee, priority, status, userId });
    //Saving the data
    await newTask.save();

    res.status(201).json(newTask);

  } catch (error) {
    //Error checking
    console.error("Error adding task:", error); 

    res.status(400).json({ error: error.message });
  }
});


// This Api gets  all registered users from the database
app.get('/users', async (req, res) => {
  try {
    //processing 
    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {

    console.error("Error fetching users:", error); 

    res.status(500).json({ error: error.message });
  }
});

// This api get all tasks from the database
app.get('/tasks', async (req, res) => {
  try {
    //Processing and returning the appropriate status
    const tasks = await Task.find({});

    res.status(200).json(tasks);

  } catch (error) {

    console.error("Error fetching tasks:", error); 

    res.status(500).json({ error: error.message });
  }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error); // Debug log
    res.status(400).json({ error: error.message });
  }
});

// This api delete or removes a specific task using the id
app.delete('/tasks/:id', async (req, res) => {
  //Processing 
  try {
    const { id } = req.params;
    //Deleting
    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: 'Task deleted successfully' });

  } catch (error) {
    console.error("Error deleting task:", error); 
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  
  console.log(`Server is listening on port ${PORT}`);
});

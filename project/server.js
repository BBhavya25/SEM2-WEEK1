const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory user database
let users = [
    { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
];

// 1. GET All Users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// 2. GET Single User
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// 3. POST Create User
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        email,
        age
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 4. PUT Update User
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email, age } = req.body;
    const user = users.find(u => u.id === userId);
    if (user) {
        if (name) user.name = name;
        if (email) user.email = email;
        if (age) user.age = age;
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// 5. DELETE User
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.status(200).json(deletedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const fs = require('fs');
const path = require('path');

// Path to data.json
const DATA_FILE = path.join(process.cwd(), 'data.json');

// Read data from data.json
function readData() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

// Write data to data.json
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        const users = readData();

        if (users.find(user => user.username === username)) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        users.push({ username, password });
        writeData(users);

        res.status(201).json({ message: 'User created successfully.' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
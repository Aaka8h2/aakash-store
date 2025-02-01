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

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        const users = readData();

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            res.status(200).json({ message: 'Login successful.' });
        } else {
            res.status(401).json({ message: 'Invalid username or password.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
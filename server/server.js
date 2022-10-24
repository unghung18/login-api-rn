const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

require('dotenv').config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: true, credentials: true }))

// Connect database
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "nodejs_api"
});

//routes

// login
app.post('/api/login', (req, res) => {
    db.query('SELECT * FROM users WHERE username = ?', [req.body.username], async (err, response) => {
        if (err) throw err


        if (response.length === 0) {
            return res.status(400).json('Sai tên tài khoản hoặc mật khẩu')
        }

        const validPassword = await bcrypt.compare(req.body.password, response[0].password)

        if (!validPassword) {
            return res.status(400).json('Sai password');
        }

        res.status(200).json(response[0])
    })
})

// logout
app.post('/api/drinks/:id', (req, res) => {
    res.json({ message: 'Logout success!' })
})

// register
app.post('/api/register', (req, res) => {
    db.query('SELECT * FROM users WHERE username= ?', [req.body.username], (err, response) => {
        if (err) throw err

        if (response.length !== 0) {
            return res.status(400).json('Username already taken');
        }


        bcrypt.hash(req.body.password, 10, (err, hashed) => {
            if (err) { return next(err); }

            db.query(`INSERT INTO users (username, password, name) VALUES(?, ?, ?)`, [req.body.username, hashed, req.body.name], (err, response) => {
                if (err) throw err
                res.json({ message: 'Insert success!' })
            })
        })
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
})
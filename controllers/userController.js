import { connection } from '../db.js'
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
    await connection.query('SELECT * FROM users')
    .then(([rows, fields]) => {
        res.send(rows);
    })
    .catch(err => {
      console.log(err);
    });
}

export const createUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    // Hash the password using bcrypt
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        // Create a new user with the hashed password
        try {
            const result = connection.query('INSERT INTO users SET ?', { name, email, password: hash, phone });
            res.status(201).send({ message: 'User created successfully.', contact: { name, email, hash, phone } });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error creating user" });
        }
    });
}

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;

    try {
        const result = await connection.query('UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, id]);
    if (result.affectedRows === 0) {
        return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: 'User updated successfully.' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error updating user" });
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await connection.query('DELETE FROM users WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
        return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: 'User deleted successfully.' });
    
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error deleting user" });
    }
}

export const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).send({ message: 'User not found'})
        }
        res.status(200).send(
            result[0]
        )
    } catch {
        console.log(error)
        res.status(500).send({ message: 'Error fetching user'})
    }
}
import { connection } from '../db.js'

export const getContacts = async (req, res) => {
    await connection.query('SELECT * FROM contacts')
    .then(([rows, fields]) => {
        res.send(rows)
      console.log(rows);
      connection.end();
    })
    .catch(err => {
      console.log(err);
      connection.end();
    });
}

export const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    console.log(name, email, phone)
    
    try {
        await connection.query('INSERT INTO contacts SET ?', { name, email, phone });
        res.status(201).send({ message: 'Contact created successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error creating contact" });
    }
}

export const getContactById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await connection.query('SELECT * FROM contacts WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).send({ message: 'Contact not found'})
        }
        res.status(200).send(
            result[0]
        )
    } catch {
        console.log(error)
        res.status(500).send({ message: 'Error fetching contact'})
    }
}

export const updateContact = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;

    try {
        const result = await connection.query('UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, id]);
    if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Contact not found" });
    }
    res.status(200).send({ message: 'Contact updated successfully.' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error updating contact" });
    }
}

export const deleteContact = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await connection.query('DELETE FROM contacts WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Contact not found" });
    }
    res.status(200).send({ message: 'Contact deleted successfully.' });
    
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error deleting contact" });
    }
}

export const getContactByName = async (req, res) => {
    const name = req.params.name;
    try {
        const results = await connection.query('SELECT * FROM contacts WHERE name LIKE ?', [`%${name}%`]);
        res.status(200).send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error searching contacts" });
    }
}

export const sortContactsByName = async (req, res) => {
    try {
        const results = await connection.query('SELECT * FROM contacts ORDER BY name');
        res.status(200).send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error sorting contacts by name" });
    }
}

export const sortContactsByEmail = async (req, res) => {
    try {
        const results = await connection.query('SELECT * FROM contacts ORDER BY email');
        res.status(200).send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error sorting contacts by email" });
    }
}

export const sortContactsByPhone = async (req, res) => {
    try {
        const results = await connection.query('SELECT * FROM contacts ORDER BY phone');
        res.status(200).send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error sorting contacts by phone" });
    }
}

export const paginationForContacts = async (req, res) => {
    const pageNumber = req.params.pageNumber;
    const limit = req.params.limit;
    const offset = (pageNumber - 1) * limit;

    try {
        const results = await connection.query('SELECT * FROM contacts LIMIT ? OFFSET ?', [limit, offset]);
        res.status(200).send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching contacts" });
    }
}
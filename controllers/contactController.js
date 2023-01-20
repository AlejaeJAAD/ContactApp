import { connection } from '../db.js'

export const getContacts = async (req, res) => {
    await connection.query('SELECT * FROM contacts')
    .then(([rows, fields]) => {
        res.send(rows)
      console.log(rows);
    })
    .catch(err => {
      console.log(err);
    });
}

export const createContact = async (req, res) => {
    const createdBy = req.params.createdBy
    const { name, email, phone } = req.body;
    try {
        const result = await connection.query('INSERT INTO contacts SET ?', { name, email, phone, createdBy });
        res.status(201).send({ message: 'Contact created successfully.', contact: { name, email, phone, createdBy } });
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
        res.status(200).send(results[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error searching contacts" });
    }
}

export const sortContactsByName = async (req, res) => {
    try {
        const results = await connection.query('SELECT * FROM contacts ORDER BY name');
        res.status(200).send(results[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error sorting contacts by name" });
    }
}

export const sortContactsByEmail = async (req, res) => {
    try {
        const results = await connection.query('SELECT * FROM contacts ORDER BY email');
        res.status(200).send(results[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error sorting contacts by email" });
    }
}

export const sortContactsByPhone = async (req, res) => {
    try {
        const results = await connection.query('SELECT * FROM contacts ORDER BY phone');
        res.status(200).send(results[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error sorting contacts by phone" });
    }
}

export const pagination = async (req, res) => {
    const pageNumber = parseInt(req.params.pageNumber);
    const limit = parseInt(req.params.limit);
    const offset = (pageNumber - 1) * limit;

    try {
        const results = await connection.query('SELECT * FROM contacts LIMIT ? OFFSET ?', [limit, offset]);
        res.status(200).send(results[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching contacts" });
    }
}

export const uploadContactPhoto = async (req, res) => {
    const id = req.params.id;
    const photo = req.file.path;

    try {
        const result = await connection.query('UPDATE contacts SET photo = ? WHERE id = ?', [photo, id]);
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Contact not found" });
        }
        res.status(200).send({ message: 'Contact photo uploaded successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error uploading contact photo" });
    }
}

export const downloadContactPhoto = async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await connection.query('SELECT photo FROM contacts WHERE id = ?', [id]);
        const { photo } = rows[0];
        console.log(photo)
        
        if (!photo) {
            return res.status(404).send({ message: "Contact not found" });
        }
        res.setHeader('Content-Disposition', 'attachment; filename=image.jpeg');
        res.set('Content-Type', 'image/jpeg');
        res.download(photo);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error getting contact photo" });
    }
}

export const countContacts = async (req, res) => {
    try {
        const result = await connection.query('SELECT COUNT(*) as total FROM contacts');
        res.status(200).send({ total: result[0][0].total });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error getting contacts count" });
    }
}

export const checkEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const [results] = await connection.query('SELECT COUNT(*) as total FROM contacts WHERE email = ?', [email]);
        const alreadyInUse = results[0].total > 0 ? true : false;
        // const alreadyInUse = !!results[0].total;

        res.send({ alreadyInUse });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error checking email" });
    }
}

export const checkPhone = async (req, res) => {
    try {
        const phone = req.params.phone;
        const result = await connection.query('SELECT COUNT(*) as total FROM contacts WHERE phone = ?', [phone]);
        res.send({ alreadyInUse: result[0].total > 0 ? true : false });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error checking phone number" });
    }
}

export const createGroup = async (req, res) => {
    const { name, description } = req.body
    
    try {
        const [result] = await connection.query(
            "INSERT INTO groups SET name = ?, description = ?, user_id = ?",
            [name, description]
        );
        res.status(201).send({ message: "Group created successfully", group: { name, description } });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error creating group" });
    }
}

export const getContactsByGroup = async (req, res) => {
    try {
        const group = req.params.group;
        const results = await connection.query('SELECT * FROM contacts WHERE group = ?', [group]);
        res.send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching contacts by group" });
    }
}

export const addGroupToContact = async (req, res) => {
    const id = req.params.id;
    const group = req.params.group;

    try {
        const result = await connection.query('UPDATE contacts SET group = ? WHERE id = ?', [group, id]);
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Contact not found" });
        }
        res.status(200).send({ message: 'Contact group updated successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error updating contact group" });
    }
}
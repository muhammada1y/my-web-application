const express = require("express");
const pool = require('./db/connect');
const cors = require('cors');
const ado = require('./db/mp3_schama.js');  // Correct the import path
const multer = require('multer');
const bodyParser = require('body-parser');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('audioFile');
const fs = require('fs');






const app = express();
app.use(cors());
app.use(express.json());

const PORT = 2006;

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err);
    } else {
        console.log('Connected to PostgreSQL. Current timestamp:', res.rows[0].now);
    }
});

app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    const insertQuery = 'INSERT INTO user_info (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, password];

    pool.query(insertQuery, values, (error, result) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const newUser = result.rows[0];
            delete newUser.password;

            console.log('User inserted successfully:', newUser);
            res.status(201).json({ message: 'User signed up successfully', user: newUser });
        }
    });
});

app.post("/login", async (req, res) => {
    const { name, password } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT * FROM user_info WHERE name = $1 AND password = $2',
        [ name, password]
      );
  
      if (result.rows.length > 0) {
        const user = result.rows[0];
        delete user.password;
        res.json(user);
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/upload', upload, async (req, res) => {
    try {
        const mp3Buffer = req.file.buffer;
        const mp3Hex = '\\x' + mp3Buffer.toString('hex');

        // Insert data into PostgreSQL table
        const query = {
            text: 'INSERT INTO media.mp3 (title, description, file_data, user_id) VALUES ($1, $2, $3, $4)',
            values: ['My Song Title', 'Description of the song', mp3Hex, 1],
        };

        const result = await pool.query(query);

        console.log('MP3 file inserted successfully:', result.rows[0]);
        res.status(201).json({ message: 'MP3 file inserted successfully' });
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/audio', async (req, res) => {
  try {
    const audio = await pool.query('SELECT * FROM mp3');
    
    console.log('Query Result:', audio); // Log the entire query result

    if (audio.rows.length === 0) {
      console.warn('No audio records found in the database.');
    }

    res.json(audio.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to save a note
app.post('/api/notes', async (req, res) => {
  try {
    const { user_id, title, content } = req.body;

    // Ensure user_id is not null before inserting into the database
    if (user_id === null || user_id === undefined) {
      return res.status(400).json({ error: 'Invalid user_id' });
    }

    const query = 'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *';
    const values = [user_id, title, content];
    const result = await pool.query(query, values);
    console.log(values)

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to get notes for a specific user
app.get('/api/notes/:user_id', async (req, res) => {
  const { user_id } = req.params;
  
  console.log(req.params)
  // Check if user_id is a valid integer
  if (isNaN(user_id)) {
    return res.status(400).json({ error: 'Invalid user_id' });
  }

  try {
    const result = await pool.query('SELECT * FROM notes WHERE user_id = $1', [parseInt(user_id)]);
    res.json({mynotes : result.rows});
    console.log(result.rows)
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Delete Note
app.delete('/api/notes/:noteId', async (req, res) => {
  const noteId = req.params.noteId;

  try {
    const result = await pool.query('DELETE FROM notes WHERE id = $1', [noteId]);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Update Note
app.put('/api/notes/:noteId', async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, noteId]
    );

    const updatedNote = result.rows[0];
    res.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  
app.listen(PORT, () => {
    console.log("Backend is running on", PORT);
});
